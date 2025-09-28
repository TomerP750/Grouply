package com.grouply.backend.project_post.dto;

import com.grouply.backend.project.Dtos.ProjectDTO;
import lombok.Data;



@Data
public class CreateProjectPostDTO {

    private String title;
    private String description;
    private Long projectId;

}
