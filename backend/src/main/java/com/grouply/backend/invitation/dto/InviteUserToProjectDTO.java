package com.grouply.backend.invitation.dto;

import com.grouply.backend.project_member.ProjectPosition;
import lombok.Data;

@Data
public class InviteUserToProjectDTO {

    private Long senderId;
    private Long recipientId;
    private Long projectId;
    private ProjectPosition position;

}
