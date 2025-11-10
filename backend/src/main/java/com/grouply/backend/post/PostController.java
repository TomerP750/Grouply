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
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/post")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @GetMapping("/all")
    public Page<PostDTO> allPosts(@RequestParam(value = "page", defaultValue = "0") int page,
                                  @RequestParam(value = "size", defaultValue = "10") int size
                                  ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, ("createdAt")));
        return postService.getAllPosts(pageable);
    }

    @GetMapping("/{postId}")
    public PostDTO onePost(@PathVariable Long postId) {
        return postService.getOnePost(postId);
    }

    @PostMapping("/create")
    public PostDTO createPost(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestBody CreateProjectPostDTO dto) throws ExistsException, UnauthorizedException {
        Long userId = userDetails.getId();
        return postService.createPost(userId ,dto);
    }

    @PutMapping("/update")
    public void updatePost(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestBody UpdateProjectPostDTO dto) throws InvalidInputException, UnauthorizedException {
        Long userId = userDetails.getId();
        postService.updatePost(userId, dto);
    }

    @DeleteMapping("/delete/{postId}")
    public void deletePostId(@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable Long postId) throws UnauthorizedException {
        Long userId = userDetails.getId();
        postService.deletePost(userId, postId);
    }

    @GetMapping("/dashboard/all")
    public Page<PostDTO> allPostsWhereUserIsOwner(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                  @RequestParam(value = "page", defaultValue = "0") int page,
                                                  @RequestParam(value = "size", defaultValue = "10") int size) {
        Long userId = userDetails.getId();
        Pageable pageable = PageRequest.of(page, size);
        return postService.getOwnedPosts(userId, pageable);
    }
    
    // TEST

    @GetMapping("/search")
    public Page<PostDTO> search(
            @RequestParam(required = false) List<ProjectPosition> roles,
            @RequestParam(required = false, name = "techIds") List<Long> techIds

    ) {
        Pageable pageable = PageRequest.of(0, 5);
        return postService.searchPosts(roles, techIds, pageable);
    }



}
