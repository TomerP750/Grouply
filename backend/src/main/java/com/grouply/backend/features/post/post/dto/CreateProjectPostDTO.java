package com.grouply.backend.features.post.post.dto;

import com.grouply.backend.features.project.project_member.ProjectPosition;
import lombok.Data;

import java.util.List;


@Data
public class CreateProjectPostDTO {

    private String title;
    private String description;
    private List<ProjectPosition> positions;
    private Long projectId;

}
