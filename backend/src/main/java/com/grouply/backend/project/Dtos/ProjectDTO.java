package com.grouply.backend.project.Dtos;
import com.grouply.backend.project.ProjectStatus;
import com.grouply.backend.project_member.dto.ProjectMemberDTO;
import com.grouply.backend.technology.dto.TechnologyDTO;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
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
    private LocalDateTime createdAt;
    private Set<TechnologyDTO> technologies;
}
