package com.grouply.backend.archived_post.dto;
import com.grouply.backend.post.dto.PostDTO;
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

