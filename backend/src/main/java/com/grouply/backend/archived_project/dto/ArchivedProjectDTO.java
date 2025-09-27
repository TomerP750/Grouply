package com.grouply.backend.archived_project.dto;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ArchivedProjectDTO {
    private Long id;
    private Long projectId;
    private Long userId;
    private LocalDateTime archivedAt;
}
