package com.grouply.backend.archived_post.dto;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ArchivedPostDTO {

    private Long id;
    private Long projectPostId;
    private Long userId;
    private LocalDateTime archivedAt;

}

