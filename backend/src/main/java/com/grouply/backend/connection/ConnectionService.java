package com.grouply.backend.connection;

import com.grouply.backend.activity.ActivityRepository;
import com.grouply.backend.exceptions.UnauthorizedException;
import com.grouply.backend.statistics.Statistics;
import com.grouply.backend.statistics.StatisticsRepository;
import com.grouply.backend.user.User;
import com.grouply.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

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





    private User fetchUser(Long userId) {
        return userRepository.findById(userId).orElseThrow(()->new NoSuchElementException("User not found"));
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
