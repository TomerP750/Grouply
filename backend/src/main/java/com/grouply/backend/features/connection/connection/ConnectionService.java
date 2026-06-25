package com.grouply.backend.features.connection.connection;

import com.grouply.backend.shared.exceptions.UnauthorizedException;
import com.grouply.backend.features.statistics.Statistics;
import com.grouply.backend.features.statistics.StatisticsRepository;
import com.grouply.backend.features.user.Dtos.UserDTO;
import com.grouply.backend.features.user.User;
import com.grouply.backend.features.user.UserRepository;
import com.grouply.backend.shared.util.EntityToDtoMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Slf4j
public class ConnectionService implements IConnectionService {

    private final ConnectionRepository connectionRepository;
    private final UserRepository userRepository;
    private final StatisticsRepository statisticsRepository;


    @Override
    public boolean areConnected(Long visitorId, Long visited) {
        return connectionRepository.existsByUserIdAndConnectedUserId(visitorId, visited);
    }

    @Override
    public boolean removeConnection(Long userId ,Long removedUserId) throws UnauthorizedException {

        if (!areConnected(userId, removedUserId)) {
            throw new UnauthorizedException("You are not connected");
        }

        Connection existing = fetchConnection(userId, removedUserId);
        connectionRepository.deleteById(existing.getId());

        // removes other person's connection
        Connection reverse = fetchConnection(removedUserId, userId);
        connectionRepository.deleteById(reverse.getId());


        Statistics userStats = fetchStats(userId);
        userStats.setConnections(userStats.getConnections() - 1);
        statisticsRepository.save(userStats);

        Statistics removedUserStats = fetchStats(removedUserId);
        removedUserStats.setConnections(removedUserStats.getConnections() - 1);
        statisticsRepository.save(removedUserStats);


        return false;

    }

    List<UserDTO> allConnectedUsers(Long userId) {

        List<Connection> connections = connectionRepository
                .findByUserId(userId);

        return connections.stream().map(c -> EntityToDtoMapper.toUserDto(c.getConnectedUser())).toList();

    }

    private Connection fetchConnection(Long userId, Long connectedUserId) {
        return connectionRepository
                .findByUserIdAndConnectedUserId(userId, connectedUserId)
                .orElseThrow(()->new NoSuchElementException("Connection not found"));
    }

    private Statistics fetchStats(Long userId) {
        return statisticsRepository.findByUserId(userId).orElseThrow(() -> new NoSuchElementException("Stats not found"));
    }
}
