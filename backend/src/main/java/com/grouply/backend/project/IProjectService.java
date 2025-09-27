package com.grouply.backend.project;

import com.grouply.backend.exceptions.InvalidInputException;
import com.grouply.backend.exceptions.UnauthorizedException;
import com.grouply.backend.project_member.ProjectPosition;

public interface IProjectService {

    void createProject(Long userId ,CreateProjectDTO dto);

//    void patchProject();

    void updateProject(Long userId ,UpdateProjectDTO dto);

    void deleteProject(Long userId ,DeleteProjectDTO dto);

    void changeStatus(Long userId, Long projectId, ProjectStatus status) throws UnauthorizedException;

    void markAsFinished(Long userId ,Long projectId) throws UnauthorizedException;

    void addUserToProject(Long ownerId, ProjectPosition position, Long projectId, Long userId) throws UnauthorizedException;

    void removeUserFromProject(Long ownerId, Long userId, Long projectId) throws UnauthorizedException;
}
