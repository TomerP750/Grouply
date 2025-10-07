package com.grouply.backend.connection;

import com.grouply.backend.user.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class ConnectionService implements IConnectionService {

    private final ConnectionRepository connectionRepository;


    @Override
    public boolean areConnected(Long visitorId, Long visited) {
        return connectionRepository.existsByUserIdAndConnectedUserId(visitorId, visited);
    }




}
