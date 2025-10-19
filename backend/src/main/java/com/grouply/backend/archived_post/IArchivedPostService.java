package com.grouply.backend.archived_post;

import com.grouply.backend.exceptions.ExistsException;

public interface IArchivedPostService {


    boolean toggleArchiveProject(Long userId, Long projectId) throws ExistsException;

}
