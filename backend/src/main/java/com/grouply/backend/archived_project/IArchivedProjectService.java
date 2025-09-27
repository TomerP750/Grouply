package com.grouply.backend.archived_project;

public interface IArchivedProjectService {


    boolean toggleArchiveProject(Long userId, Long projectId);

}
