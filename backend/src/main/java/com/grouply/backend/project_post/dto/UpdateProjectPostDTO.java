package com.grouply.backend.project_post.dto;

import lombok.Data;

@Data
public class UpdateProjectPostDTO {

    private Long postId;
    private String title;
    private String description;

}
