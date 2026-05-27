package com.grouply.backend.post.project_post_position.dto;

import com.grouply.backend.project.project_member.ProjectPosition;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectPostPositionDTO {

    private Long id;
    private Long projectPostId;
    private ProjectPosition position;

}