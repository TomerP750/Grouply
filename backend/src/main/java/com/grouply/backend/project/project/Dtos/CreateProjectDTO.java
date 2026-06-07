package com.grouply.backend.project.project.Dtos;

import com.grouply.backend.project.project.ProjectStatus;
import com.grouply.backend.project.project_member.ProjectPosition;
//import com.grouply.backend.technology.Technology;

import com.grouply.backend.technology.dto.TechnologyDTO;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;


import java.util.List;
import java.util.Set;

@Data
public class CreateProjectDTO {

    @NotBlank(message = "Project name is required")
    @Size(min = 2, max = 100, message = "Project name must be between 2 and 100 characters")
    private String name;

    @NotNull(message = "Project status is required")
    private ProjectStatus status;

    @NotNull(message = "Technologies list is required")
    @Size(min = 1, message = "At least one technology must be selected")
    private Set<TechnologyDTO> technologies;

    @Size(max = 5, message = "Maximum 5 DM links allowed")
    private List<String> defaultDmLinks;

    @NotNull(message = "User position is required")
    private ProjectPosition userPosition;
}
