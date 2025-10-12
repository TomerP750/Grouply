package com.grouply.backend.post;

import com.grouply.backend.exceptions.ExistsException;
import com.grouply.backend.exceptions.InvalidInputException;
import com.grouply.backend.exceptions.UnauthorizedException;
import com.grouply.backend.post.dto.CreateProjectPostDTO;
//import com.grouply.backend.project_post.dto.DeleteProjectPostDTO;
import com.grouply.backend.post.dto.PostDTO;
import com.grouply.backend.post.dto.UpdateProjectPostDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IPostService {

    PostDTO createPost(Long userId , CreateProjectPostDTO dto) throws ExistsException, UnauthorizedException;

    void updatePost(Long userId ,UpdateProjectPostDTO dto) throws UnauthorizedException, InvalidInputException;

    void deletePost(Long userId, Long postId) throws UnauthorizedException;

    PostDTO getOnePost(Long postId);

    Page<PostDTO> getAllPosts(Pageable pageable);

    boolean requestToJoinProject(Long userId, Long ownerId, Long projectId);
}
