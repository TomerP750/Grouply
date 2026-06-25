package com.grouply.backend.features.post.archived_post;

import com.grouply.backend.shared.exceptions.ExistsException;

public interface IArchivedPostService {


    boolean toggleArchiveProject(Long userId, Long projectId) throws ExistsException;

}
