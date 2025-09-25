package com.grouply.backend.project;

import com.grouply.backend.exceptions.InvalidInputException;
import com.grouply.backend.exceptions.UnauthorizedException;

public interface IProjectService {

    void createProject(CreateProjectDTO dto);

//    void patchProject();

    void updateProject(UpdateProjectDTO dto);

    void deleteProject(DeleteProjectDTO dto);

    void markAsFinished(Long userId ,Long projectId) throws UnauthorizedException, InvalidInputException;

}
