package com.grouply.backend.post.dto;

import com.grouply.backend.project.Dtos.ProjectDTO;
import com.grouply.backend.project_post_position.dto.ProjectPostPositionDTO;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class ProjectPostDTO {

    private Long id;
    private String title;
    private String description;
    private List<ProjectPostPositionDTO> positions;
    private ProjectDTO projectDTO;
    private LocalDateTime postedAt;

}
