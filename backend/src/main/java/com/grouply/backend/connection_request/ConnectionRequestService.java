package com.grouply.backend.connection_request;

import com.grouply.backend.connection.ConnectionRepository;
import com.grouply.backend.user.User;
import com.grouply.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Slf4j
public class ConnectionRequestService implements IConnectionRequestService{

    private final ConnectionRequestRepository connectionRequestRepository;
    private final ConnectionRepository connectionRepository;
    private final UserRepository userRepository;

    @Override
    public boolean toggleConnectionRequest(Long recipientId) {
        return false;
    }

    private User fetchUser(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new NoSuchElementException("User not found"));
    }




}
