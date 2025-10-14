package com.grouply.backend.connection_request;

import com.grouply.backend.connection_request.dto.ConnectionRequestDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ConnectionRequestRepository extends JpaRepository<ConnectionRequest, Long> {
    boolean existsBySenderIdAndRecipientId(Long senderId, Long recipientId);

    Optional<ConnectionRequest> findBySenderIdAndRecipientId(Long senderId, Long recipientId);

    Page<ConnectionRequest> findByRecipientId(Long recipientId, Pageable pageable);
}
