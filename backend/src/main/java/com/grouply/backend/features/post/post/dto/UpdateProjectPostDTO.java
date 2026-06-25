package com.grouply.backend.features.post.post.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
public class UpdateProjectPostDTO {

    @NotBlank
    private Long postId;
    @NotBlank
    @Length(min = 5, message = "At least 5 characters")
    private String title;
    private String description;

}
