package com.grouply.backend.features.post.post;

import com.grouply.backend.features.post.post.dto.PostDTO;
import com.grouply.backend.shared.exceptions.ExistsException;
import com.grouply.backend.shared.exceptions.InvalidInputException;
import com.grouply.backend.shared.exceptions.UnauthorizedException;
import com.grouply.backend.features.post.post.dto.CreateProjectPostDTO;
//import com.grouply.backend.project_post.dto.DeleteProjectPostDTO;
import com.grouply.backend.features.post.post.dto.UpdateProjectPostDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IPostService {

    PostDTO createPost(Long userId , CreateProjectPostDTO dto) throws ExistsException, UnauthorizedException;

    void updatePost(Long userId ,UpdateProjectPostDTO dto) throws UnauthorizedException, InvalidInputException;

    void deletePost(Long userId, Long postId) throws UnauthorizedException;

    PostDTO getOnePost(Long postId);

    Page<PostDTO> getAllPosts(Pageable pageable);
}
