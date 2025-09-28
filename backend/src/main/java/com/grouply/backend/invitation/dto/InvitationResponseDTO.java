package com.grouply.backend.invitation.dto;

import com.grouply.backend.invitation.InvitationStatus;
import lombok.Data;

@Data
public class InvitationResponseDTO {

    private Long recipientId;
    private Long invitationId;
    private InvitationStatus response;

}
