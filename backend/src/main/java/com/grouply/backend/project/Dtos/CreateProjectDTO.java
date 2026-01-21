package com.grouply.backend.project.Dtos;

import com.grouply.backend.project.ProjectStatus;
import com.grouply.backend.project_member.ProjectPosition;
//import com.grouply.backend.technology.Technology;

import com.grouply.backend.technology.dto.TechnologyDTO;
import lombok.Data;


import java.time.LocalDateTime;

import java.util.List;
import java.util.Set;

@Data
public class CreateProjectDTO {

    private String name;
    private ProjectStatus status;
    private Set<TechnologyDTO> technologies;
    private List<String> defaultDmLinks;

    // this is for user to select his position its not actually related to the project
    private ProjectPosition userPosition;

}
