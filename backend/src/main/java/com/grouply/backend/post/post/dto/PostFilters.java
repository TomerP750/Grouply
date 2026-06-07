package com.grouply.backend.post.post.dto;

import com.grouply.backend.post.project_post_position.ProjectPostPosition;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;

@Data
public class PostFilters {

    private String title;
    private ProjectPostPosition roleDemand;
    private Set<Long> technologiesIds;
    private LocalDateTime postedAt;

}
