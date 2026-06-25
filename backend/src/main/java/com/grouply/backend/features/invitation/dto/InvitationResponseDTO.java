package com.grouply.backend.features.invitation.dto;

import com.grouply.backend.features.invitation.InvitationStatus;
import lombok.Data;

@Data
public class InvitationResponseDTO {

    private Long recipientId;
    private Long invitationId;
    private InvitationStatus response;

}
