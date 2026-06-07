package com.grouply.backend.connection.connection_request;

import com.grouply.backend.activity.ActivityService;
import com.grouply.backend.activity.ActivityType;
import com.grouply.backend.connection.connection.Connection;
import com.grouply.backend.connection.connection.ConnectionRepository;
import com.grouply.backend.connection.connection_request.dto.ConnectionRequestDTO;
import com.grouply.backend.shared.exceptions.UnauthorizedException;
import com.grouply.backend.statistics.StatisticsRepository;
import com.grouply.backend.user.User;
import com.grouply.backend.shared.util.EntityToDtoMapper;
import com.grouply.backend.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Slf4j
public class ConnectionRequestService implements IConnectionRequestService {

    private final ConnectionRequestRepository connectionRequestRepository;
    private final ConnectionRepository connectionRepository;
    private final StatisticsRepository statisticsRepository;
    private final ActivityService activityService;
    private final UserService userService;


    public Page<ConnectionRequestDTO> allConnectionRequests(Long recipientId, Pageable pageable) {
        return connectionRequestRepository
                .findByRecipientId(recipientId, pageable)
                .map(EntityToDtoMapper::toConnectionRequestDto);
    }

    @Override
    public boolean hasPendingRequestFromVisitedUser(Long visitorId, Long visitedId) {
        return connectionRequestRepository
                .existsBySenderIdAndRecipientId(visitedId, visitorId);
    }

    @Override
    @Transactional
//    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public boolean toggleConnectionRequest(Long senderId, Long recipientId) throws UnauthorizedException {

        if (senderId.equals(recipientId)) {
            throw new UnauthorizedException("You cannot send yourself request");
        }

        if (connectionRequestRepository.existsBySenderIdAndRecipientId(senderId, recipientId)) {
            ConnectionRequest existing = fetchRequest(senderId, recipientId);
            connectionRequestRepository.deleteById(existing.getId());
            return false;
        }

        User sender = userService.findOneUser(senderId);
        User recipient = userService.findOneUser(recipientId);

        ConnectionRequest newRequest = ConnectionRequest.builder()
                .sender(sender)
                .recipient(recipient)
                .status(ConnectionRequestStatus.PENDING)
                .build();
        connectionRequestRepository.save(newRequest);

        //TODO remove activity if cancel the join request

        activityService
                .createActivity("You sent connection request to " + " " + recipient.getUsername()
                        , "/profile/" + recipientId
                        , ActivityType.SENT_CONNECTION_REQUEST
                        , sender.getId());



        return true;
    }

    @Override
    @Transactional
    public void acceptRequest(Long recipientId, Long senderId) throws UnauthorizedException {

        if (recipientId.equals(senderId)) {
            throw new UnauthorizedException("Cannot accept this request");
        }

        createConnectionPair(senderId, recipientId);

        ConnectionRequest request = connectionRequestRepository
                .findBySenderIdAndRecipientId(senderId, recipientId)
                .orElseThrow(() -> new NoSuchElementException("Request not found"));

        connectionRequestRepository.deleteById(request.getId());


    }

    @Override
    public void declineRequest(Long recipientId, Long senderId) throws UnauthorizedException {

        if (recipientId.equals(senderId)) {
            throw new UnauthorizedException("Cannot decline this request");
        }

        ConnectionRequest request = connectionRequestRepository
                .findBySenderIdAndRecipientId(senderId, recipientId)
                .orElseThrow(() -> new NoSuchElementException("Request not found"));

        connectionRequestRepository.deleteById(request.getId());

    }



    private ConnectionRequest fetchRequest(Long senderId, Long recipientId) {
        return connectionRequestRepository.findBySenderIdAndRecipientId(senderId, recipientId).orElseThrow(() -> new NoSuchElementException("Request not found"));
    }

    /**
     * Creates a bidirectional connection between two users by persisting two reciprocal connection records.
     *
     * After establishing the relationship, the method updates both users' connection statistics by incrementing
     * their total connections count and persists the updated statistics.
     *
     * It also generates activity records for both users to reflect the newly created connection, including
     * navigation links to each user's profile.
     *
     * This operation involves multiple persistence steps and should be executed within a transactional boundary
     * to ensure data consistency across connection creation, statistics updates, and activity logging.
     */
    private void createConnectionPair(Long senderId, Long recipientId) {

        User sender = userService.findOneUser(senderId);
        User recipient = userService.findOneUser(recipientId);

        Connection connectionSender = Connection.builder()
                .user(sender)
                .connectedUser(recipient)
                .build();

        Connection connectionRecipient = Connection.builder()
                .user(recipient)
                .connectedUser(sender)
                .build();

        connectionRepository.saveAll(List.of(connectionSender, connectionRecipient));

        // Incrementing stats by 1
        statisticsRepository.incrementConnections(senderId);
        statisticsRepository.incrementConnections(recipientId);

        activityService.createActivity(
                "You connected with " + recipient.getUsername(),
                "/profile/" + recipientId,
                ActivityType.CONNECTED,
                senderId
        );

        activityService.createActivity(
                "You connected with " + sender.getUsername(),
                "/profile/" + senderId,
                ActivityType.CONNECTED,
                recipientId
        );


    }


}
