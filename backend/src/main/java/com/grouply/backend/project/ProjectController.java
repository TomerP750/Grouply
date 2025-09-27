package com.grouply.backend.project;

import com.grouply.backend.exceptions.InvalidInputException;
import com.grouply.backend.project.Dtos.CreateProjectDTO;
import com.grouply.backend.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/project")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping("/create")
    public void createProject(@AuthenticationPrincipal CustomUserDetails userDetails ,@RequestBody CreateProjectDTO dto) throws InvalidInputException {
        Long userId = userDetails.getId();
        projectService.createProject(userId, dto);
    }








}
