package com.grouply.backend.features.post.archived_post.dto;
import com.grouply.backend.features.post.post.dto.PostDTO;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ArchivedPostDTO {

    private Long id;
    private PostDTO projectPost;
    private Long userId;
    private LocalDateTime archivedAt;

}

