package com.grouply.backend.project.project.Dtos;

import com.grouply.backend.project.project.ProjectStatus;
import lombok.Data;

import java.util.List;

@Data
public class UpdateProjectDTO {

    private Long projectId;
    private String name;
    private ProjectStatus status;
    private List<String> defaultDmLinks;
//    private Set<Technology> technologies;


}
