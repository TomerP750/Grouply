package com.grouply.backend.post;

import com.grouply.backend.exceptions.ExistsException;
import com.grouply.backend.exceptions.InvalidInputException;
import com.grouply.backend.exceptions.UnauthorizedException;
import com.grouply.backend.post.dto.CreateProjectPostDTO;
//import com.grouply.backend.project_post.dto.DeleteProjectPostDTO;
import com.grouply.backend.post.dto.PostDTO;
import com.grouply.backend.post.dto.UpdateProjectPostDTO;
import com.grouply.backend.project_member.ProjectPosition;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IPostService {

    PostDTO createPost(Long userId , CreateProjectPostDTO dto) throws ExistsException, UnauthorizedException;

    void updatePost(Long userId ,UpdateProjectPostDTO dto) throws UnauthorizedException, InvalidInputException;

    void deletePost(Long userId, Long postId) throws UnauthorizedException;

    PostDTO getOnePost(Long postId);

    Page<PostDTO> getAllPosts(Pageable pageable, List<ProjectPosition> roles);

    boolean requestToJoinProject(Long userId, Long ownerId, Long projectId);
}
