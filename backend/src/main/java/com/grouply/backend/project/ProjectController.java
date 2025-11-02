package com.grouply.backend.project;

import com.grouply.backend.exceptions.InvalidInputException;
import com.grouply.backend.exceptions.UnauthorizedException;
import com.grouply.backend.project.Dtos.CreateProjectDTO;
import com.grouply.backend.project.Dtos.ProjectDTO;
import com.grouply.backend.project.Dtos.UpdateProjectDTO;
import com.grouply.backend.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/project")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;


    @GetMapping("/all")
    public Page<ProjectDTO> allPages(Pageable pageable) {
        return projectService.getAllProjects(pageable);
    }

    @GetMapping("/{projectId}")
    public ProjectDTO oneProject(@PathVariable Long projectId) {
        return projectService.getOneProject(projectId);
    }

    @PostMapping("/create")
    public void createProject(@AuthenticationPrincipal CustomUserDetails userDetails ,@RequestBody CreateProjectDTO dto) throws InvalidInputException {
        Long userId = userDetails.getId();
        projectService.createProject(userId, dto);
    }

    @PutMapping("/update")
    public void updateProject(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestBody UpdateProjectDTO dto) throws InvalidInputException, UnauthorizedException {
        Long userId = userDetails.getId();
        projectService.updateProject(userId, dto);
    }

    @DeleteMapping("/delete/{projectId}")
    public void deleteProject(@AuthenticationPrincipal CustomUserDetails userDetails ,@PathVariable Long projectId) throws UnauthorizedException {
        Long userId = userDetails.getId();
        projectService.deleteProject(userId, projectId);
    }

    //TODO merge all and paged in one method
    @GetMapping("/owned")
    public Page<ProjectDTO> getUserOwnedProjects(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                 @RequestParam(value = "pageIndex", defaultValue = "0") int pageIndex,
                                                 @RequestParam(value = "size", defaultValue = "10") int size) {
        PageRequest pageRequest = PageRequest.of(pageIndex, size);
        Long userId = userDetails.getId();
        return projectService.getUserOwnedProjects(userId, pageRequest);
    }

    @GetMapping("/owned/all")
    public List<ProjectDTO> allUserOwnedProjects(@AuthenticationPrincipal CustomUserDetails userDetails) {
        Long userId = userDetails.getId();
        return projectService.getAllUserOwnedProjects(userId);
    }

    @GetMapping("/owned/noPost")
    public List<ProjectDTO> allUserProjectsWithNoPosts(@AuthenticationPrincipal CustomUserDetails userDetails) {
        Long userId = userDetails.getId();
        return projectService.getAllUserProjectsWithNoPosts(userId);
    }





}
