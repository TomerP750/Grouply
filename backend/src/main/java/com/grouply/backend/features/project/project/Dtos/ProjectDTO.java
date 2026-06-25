package com.grouply.backend.features.project.project.Dtos;
import com.grouply.backend.features.project.project.ProjectStatus;
import com.grouply.backend.features.technology.dto.TechnologyDTO;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectDTO {
    private Long id;
    private String name;
    private ProjectStatus status;
    private String githubRepositoryUrl;
    private LocalDateTime createdAt;
    private Set<TechnologyDTO> technologies;
}
