package com.grouply.backend.connection;

import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

public interface ConnectionRepository extends JpaRepository<Connection, Long> {
    boolean existsByUserIdAndConnectedUserId(Long visitor, Long visited);
    List<Connection> findByUserId(Long userId);
    Optional<Connection> findByUserIdAndConnectedUserId(Long userId, Long connectedUserId);
}
