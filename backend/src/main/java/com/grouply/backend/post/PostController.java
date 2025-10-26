package com.grouply.backend.post;

import com.grouply.backend.exceptions.ExistsException;
import com.grouply.backend.exceptions.InvalidInputException;
import com.grouply.backend.exceptions.UnauthorizedException;
import com.grouply.backend.post.dto.CreateProjectPostDTO;
import com.grouply.backend.post.dto.PostDTO;
import com.grouply.backend.post.dto.UpdateProjectPostDTO;
import com.grouply.backend.project_member.ProjectPosition;
import com.grouply.backend.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/post")
@RequiredArgsConstructor
public class PostController {

    private final PostService projectPostService;

    @GetMapping("/all")
    public Page<PostDTO> allPosts(@RequestParam(value = "page", defaultValue = "0") int page,
                                  @RequestParam(value = "size", defaultValue = "10") int size,
                                  @RequestParam(required = false) List<ProjectPosition> roles) {
        Pageable pageable = PageRequest.of(page, size);
        return projectPostService.getAllPosts(pageable, roles);
    }

    @GetMapping("/{postId}")
    public PostDTO onePost(@PathVariable Long postId) {
        return projectPostService.getOnePost(postId);
    }

    @PostMapping("/create")
    public PostDTO createPost(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestBody CreateProjectPostDTO dto) throws ExistsException, UnauthorizedException {
        Long userId = userDetails.getId();
        return projectPostService.createPost(userId ,dto);
    }

    @PutMapping("/update")
    public void updatePost(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestBody UpdateProjectPostDTO dto) throws InvalidInputException, UnauthorizedException {
        Long userId = userDetails.getId();
        projectPostService.updatePost(userId, dto);
    }

    @DeleteMapping("/delete/{postId}")
    public void deletePostId(@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable Long postId) throws UnauthorizedException {
        Long userId = userDetails.getId();
        projectPostService.deletePost(userId, postId);
    }

}
