package com.grouply.backend.project_post;

import com.grouply.backend.project.Dtos.ProjectDTO;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ProjectPostDTO {

    private Long id;
    private String title;
    private String description;
    private ProjectDTO projectDTO;
    private LocalDateTime createdAt;

}
