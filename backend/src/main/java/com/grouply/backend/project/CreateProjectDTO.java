package com.grouply.backend.project;

import com.grouply.backend.project_member.ProjectMember;
import com.grouply.backend.project_member.ProjectPosition;
import com.grouply.backend.technology.Technology;

import lombok.Data;


import java.time.LocalDateTime;

import java.util.Set;

@Data
public class CreateProjectDTO {

    private String name;
    private LocalDateTime createdAt;
    private ProjectStatus status;
    private Set<Technology> technologies;
    private ProjectPosition userPosition;

}
