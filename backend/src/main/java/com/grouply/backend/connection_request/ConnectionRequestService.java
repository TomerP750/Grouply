package com.grouply.backend.connection_request;

import com.grouply.backend.activity.ActivityService;
import com.grouply.backend.activity.ActivityType;
import com.grouply.backend.connection.Connection;
import com.grouply.backend.connection.ConnectionRepository;
import com.grouply.backend.connection_request.dto.ConnectionRequestDTO;
import com.grouply.backend.exceptions.UnauthorizedException;
import com.grouply.backend.statistics.Statistics;
import com.grouply.backend.statistics.StatisticsRepository;
import com.grouply.backend.user.User;
import com.grouply.backend.user.UserRepository;
import com.grouply.backend.util.EntityToDtoMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Slf4j
public class ConnectionRequestService implements IConnectionRequestService {

    private final ConnectionRequestRepository connectionRequestRepository;
    private final ConnectionRepository connectionRepository;
    private final UserRepository userRepository;
    private final StatisticsRepository statisticsRepository;
    private final ActivityService activityService;
//    private final NotificationService notificationService;


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
    public boolean toggleConnectionRequest(Long senderId, Long recipientId) throws UnauthorizedException {

        if (senderId.equals(recipientId)) {
            throw new UnauthorizedException("You cannot send yourself request");
        }

        if (connectionRequestRepository.existsBySenderIdAndRecipientId(senderId, recipientId)) {
            ConnectionRequest existing = fetchRequest(senderId, recipientId);
            connectionRequestRepository.deleteById(existing.getId());
            return false;
        }

        User sender = fetchUser(senderId);
        User recipient = fetchUser(recipientId);

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
                        , sender);


//        notificationService.sendUserNotification(
//                recipientId,
//                NotificationType.CONNECTION_REQUEST,
//                senderId,
//                sender.getUsername() + " Sent you connection request."
//        );

        return true;
    }

    @Override
    public void acceptRequest(Long recipientId, Long senderId) throws UnauthorizedException {

        if (recipientId.equals(senderId)) {
            throw new UnauthorizedException("Cannot accept this request");
        }

        createConnectionPair(senderId, recipientId);


        //TODO maybe remove this
        ConnectionRequest request = connectionRequestRepository
                .findBySenderIdAndRecipientId(senderId, recipientId)
                .orElseThrow(() -> new NoSuchElementException("Request not found"));

        connectionRequestRepository.deleteById(request.getId());

        User recipient = fetchUser(recipientId);

//        notificationService.sendUserNotification(
//                senderId,
//                NotificationType.ACCEPTED_CONNECTION,
//                recipientId,
//                recipient.getUsername() + " accepted your connection request."
//        );

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

    private User fetchUser(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new NoSuchElementException("User not found"));
    }

    private ConnectionRequest fetchRequest(Long senderId, Long recipientId) {
        return connectionRequestRepository.findBySenderIdAndRecipientId(senderId, recipientId).orElseThrow(() -> new NoSuchElementException("Request not found"));
    }

    private void createConnectionPair(Long senderId, Long recipientId) {

        Connection connectionSender = Connection.builder()
                .user(fetchUser(senderId))
                .connectedUser(fetchUser(recipientId))
                .build();

        Connection connectionRecipient = Connection.builder()
                .user(fetchUser(recipientId))
                .connectedUser(fetchUser(senderId))
                .build();

        connectionRepository.save(connectionSender);
        connectionRepository.save(connectionRecipient);


        Statistics senderStats = statisticsRepository.findByUserId(senderId).orElseThrow(() -> new NoSuchElementException("Sender id not found"));
        senderStats.setConnections(senderStats.getConnections() + 1);
        statisticsRepository.save(senderStats);

        Statistics recipientStats = statisticsRepository.findByUserId(recipientId).orElseThrow(() -> new NoSuchElementException("Recipient id not found"));
        recipientStats.setConnections(recipientStats.getConnections() + 1);
        statisticsRepository.save(recipientStats);


        activityService
                .createActivity("You connected with"
                                + " "
                                + connectionRecipient.getConnectedUser().getUsername(),
                        "/profile/" + recipientId
                        , ActivityType.CONNECTED
                        , connectionSender.getUser());


        activityService
                .createActivity("You connected with"
                                + " "
                                + connectionSender.getConnectedUser().getUsername()
                        , "/profile/" + senderId
                        , ActivityType.CONNECTED
                        , connectionRecipient.getUser());


    }


}
