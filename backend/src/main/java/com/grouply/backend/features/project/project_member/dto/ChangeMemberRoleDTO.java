package com.grouply.backend.features.project.project_member.dto;

import com.grouply.backend.features.project.project_member.ProjectRole;
import lombok.Data;

@Data
public class ChangeMemberRoleDTO {
    private Long memberId;
    private Long projectId;
    private ProjectRole role;
}
