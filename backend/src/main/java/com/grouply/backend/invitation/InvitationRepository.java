package com.grouply.backend.invitation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

public interface InvitationRepository extends JpaRepository<Invitation, Long> {

    boolean existsBySenderIdAndRecipientIdAndProjectId(Long senderId, Long recipientId, Long projectId);

    Invitation findBySenderIdAndRecipientIdAndProjectId(Long senderId, Long recipientId, Long projectId);

    @Transactional
    @Modifying
    @Query("DELETE from Invitation i where i.status = 'PENDING' AND i.sentAt <= :threshold  ")
    void clearExpiredInvitations(@Param("threshold") LocalDateTime now);

}
