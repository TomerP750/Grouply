package com.grouply.backend.invitation;

import org.springframework.data.jpa.repository.JpaRepository;

public interface InvitationRepository extends JpaRepository<Invitation, Long> {
    boolean existsBySenderIdAndRecipientIdAndProjectId(Long senderId, Long recipientId, Long projectId);

    Invitation findBySenderIdAndRecipientIdAndProjectId(Long senderId, Long recipientId, Long projectId);

}
