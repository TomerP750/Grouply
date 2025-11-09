package com.grouply.backend.project.Dtos;

import com.grouply.backend.project.ProjectStatus;
import com.grouply.backend.project_member.ProjectPosition;
//import com.grouply.backend.technology.Technology;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;

@Data
public class UpdateProjectDTO {

    private Long projectId;
    private String name;
    private ProjectStatus status;
//    private Set<Technology> technologies;


}
