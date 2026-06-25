package com.grouply.backend.features.project.project;

import com.grouply.backend.features.project.project.Dtos.CreateProjectDTO;
import com.grouply.backend.features.project.project.Dtos.ProjectDTO;
import com.grouply.backend.features.project.project.Dtos.UpdateProjectDTO;
import com.grouply.backend.shared.exceptions.InvalidInputException;
import com.grouply.backend.shared.exceptions.UnauthorizedException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IProjectService {

    void createProject(Long userId , CreateProjectDTO dto) throws InvalidInputException;

    void updateProject(Long userId , UpdateProjectDTO dto) throws UnauthorizedException, InvalidInputException;

    void deleteProject(Long userId, Long projectId) throws UnauthorizedException;

//    void markAsFinished(Long userId ,Long projectId) throws UnauthorizedException;

    Page<ProjectDTO> getAllProjects(Pageable pageable);

    ProjectDTO getOneProject(Long projectId);

//    void addUserToProject(Long ownerId, ProjectPosition position, Long projectId, Long userId) throws UnauthorizedException;
//
//    void removeUserFromProject(Long ownerId, Long userId, Long projectId) throws UnauthorizedException;
}
