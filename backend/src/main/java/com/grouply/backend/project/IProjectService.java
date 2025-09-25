package com.grouply.backend.project;

public interface IProjectService {

    void createProject();

    void patchProject();

    void updateProject();

    void deleteProject();

    void markAsFinished(Long projectId);

}
