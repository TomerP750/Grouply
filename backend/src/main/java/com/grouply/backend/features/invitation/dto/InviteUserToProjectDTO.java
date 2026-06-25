package com.grouply.backend.features.invitation.dto;

import com.grouply.backend.features.project.project_member.ProjectPosition;
import lombok.Data;

@Data
public class InviteUserToProjectDTO {

    private Long recipientId;
    private Long projectId;
    private ProjectPosition position;

}
