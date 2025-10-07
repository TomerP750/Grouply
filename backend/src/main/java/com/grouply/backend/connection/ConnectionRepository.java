package com.grouply.backend.connection;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ConnectionRepository extends JpaRepository<Connection, Long> {
    boolean existsByUserIdAndConnectedUserId(Long visitor, Long visited);
}
