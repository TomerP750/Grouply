package com.grouply.backend.post.dto;

import lombok.Data;

@Data
public class UpdateProjectPostDTO {

    private Long postId;
    private String title;
    private String description;

}
