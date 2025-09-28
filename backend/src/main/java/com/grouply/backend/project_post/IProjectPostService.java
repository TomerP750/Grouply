package com.grouply.backend.project_post;

import com.grouply.backend.exceptions.ExistsException;
import com.grouply.backend.exceptions.InvalidInputException;
import com.grouply.backend.exceptions.UnauthorizedException;
import com.grouply.backend.project_post.dto.CreateProjectPostDTO;
//import com.grouply.backend.project_post.dto.DeleteProjectPostDTO;
import com.grouply.backend.project_post.dto.ProjectPostDTO;
import com.grouply.backend.project_post.dto.UpdateProjectPostDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IProjectPostService {

    void createProjectPost(Long userId ,CreateProjectPostDTO dto) throws ExistsException, UnauthorizedException;

    void updateProjectPost(Long userId ,UpdateProjectPostDTO dto) throws UnauthorizedException, InvalidInputException;

    void deleteProjectPost(Long userId, Long postId) throws UnauthorizedException;

    ProjectPostDTO getOneProjectPost(Long postId);

    Page<ProjectPostDTO> getAllProjectPosts(Pageable pageable);

    boolean requestToJoinProject(Long userId, Long ownerId, Long projectId);
}
