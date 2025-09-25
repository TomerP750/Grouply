package com.grouply.backend.project;

public interface IProjectService {

    void createProject(CreateProjectDTO dto);

//    void patchProject();

    void updateProject(UpdateProjectDTO dto);

    void deleteProject(DeleteProjectDTO dto);

    void markAsFinished(Long userId ,Long projectId);

}
