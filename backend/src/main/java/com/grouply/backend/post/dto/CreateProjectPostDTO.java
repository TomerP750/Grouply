package com.grouply.backend.post.dto;

import com.grouply.backend.project_member.ProjectPosition;
import lombok.Data;

import java.util.List;


@Data
public class CreateProjectPostDTO {

    private String title;
    private String description;
    private List<ProjectPosition> positions;
    private Long projectId;

}
