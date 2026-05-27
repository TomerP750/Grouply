package com.grouply.backend.post.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
public class UpdateProjectPostDTO {

    @NotBlank
    @Length(min = 10, message = "At least 10 characters")
    private Long postId;
    @NotBlank
    @Length(min = 5, message = "At least 5 characters")
    private String title;
    private String description;

}
