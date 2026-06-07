package com.grouply.backend.post.post.dto;

import com.grouply.backend.project.project.Dtos.ProjectDTO;
import com.grouply.backend.post.project_post_position.dto.ProjectPostPositionDTO;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class PostDTO {

    private Long id;
    private String title;
    private String description;
    private List<ProjectPostPositionDTO> positions;
    private ProjectDTO projectDTO;
    private LocalDateTime postedAt;

}
