package com.grouply.backend.connection_request;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ConnectionRequestRepository extends JpaRepository<ConnectionRequest, Long> {
    boolean existsBySenderIdAndRecipientId(Long senderId, Long recipientId);

    Optional<ConnectionRequest> findBySenderIdAndRecipientId(Long senderId, Long recipientId);
}
