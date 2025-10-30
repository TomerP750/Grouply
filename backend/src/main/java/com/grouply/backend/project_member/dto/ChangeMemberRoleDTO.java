package com.grouply.backend.project_member.dto;

import com.grouply.backend.project_member.ProjectRole;
import lombok.Data;

@Data
public class ChangeMemberRoleDTO {
    private Long memberId;
    private Long projectId;
    private ProjectRole role;
}
