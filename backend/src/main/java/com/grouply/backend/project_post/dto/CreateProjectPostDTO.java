package com.grouply.backend.project_post.dto;

import com.grouply.backend.project.Dtos.ProjectDTO;
import com.grouply.backend.project_member.ProjectPosition;
import com.grouply.backend.project_post_position.dto.ProjectPostPositionDTO;
import lombok.Data;

import java.util.List;


@Data
public class CreateProjectPostDTO {

    private String title;
    private String description;
    private List<ProjectPosition> positions;
    private Long projectId;

}
