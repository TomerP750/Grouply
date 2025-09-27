package com.grouply.backend.project;

import com.grouply.backend.exceptions.InvalidInputException;
import com.grouply.backend.exceptions.UnauthorizedException;
import com.grouply.backend.project.Dtos.CreateProjectDTO;
import com.grouply.backend.project.Dtos.ProjectDTO;
import com.grouply.backend.project.Dtos.UpdateProjectDTO;
import com.grouply.backend.project_member.ProjectPosition;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IProjectService {

    void createProject(Long userId , CreateProjectDTO dto) throws InvalidInputException;

    void updateProject(Long userId , UpdateProjectDTO dto) throws UnauthorizedException, InvalidInputException;

    void deleteProject(Long userId, Long projectId) throws UnauthorizedException;

//    void markAsFinished(Long userId ,Long projectId) throws UnauthorizedException;

    void addUserToProject(Long ownerId, ProjectPosition position, Long projectId, Long userId) throws UnauthorizedException;


    Page<ProjectDTO> getAllProjects(Pageable pageable);
//    void addUserToProject(Long ownerId, ProjectPosition position, Long projectId, Long userId) throws UnauthorizedException;
//
//    void removeUserFromProject(Long ownerId, Long userId, Long projectId) throws UnauthorizedException;
}
