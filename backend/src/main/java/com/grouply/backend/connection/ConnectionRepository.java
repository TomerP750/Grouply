package com.grouply.backend.connection;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ConnectionRepository extends JpaRepository<Connection, Long> {
    boolean existsByUserIdAndConnectedUserId(Long visitor, Long visited);

    Optional<Connection> findByUserIdAndConnectedUserId(Long userId, Long connectedUserId);
}
