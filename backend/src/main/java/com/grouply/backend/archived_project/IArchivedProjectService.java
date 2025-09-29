package com.grouply.backend.archived_project;

import com.grouply.backend.exceptions.ExistsException;

public interface IArchivedProjectService {


    boolean toggleArchiveProject(Long userId, Long projectId) throws ExistsException;

}
