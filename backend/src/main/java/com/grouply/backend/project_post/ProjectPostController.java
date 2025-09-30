package com.grouply.backend.project_post;

import com.grouply.backend.exceptions.ExistsException;
import com.grouply.backend.exceptions.InvalidInputException;
import com.grouply.backend.exceptions.UnauthorizedException;
import com.grouply.backend.project_post.dto.CreateProjectPostDTO;
import com.grouply.backend.project_post.dto.ProjectPostDTO;
import com.grouply.backend.project_post.dto.UpdateProjectPostDTO;
import com.grouply.backend.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projPost")
@RequiredArgsConstructor
public class ProjectPostController {

    private final ProjectPostService projectPostService;

    @GetMapping("/all")
    public Page<ProjectPostDTO> allPosts(@RequestParam(value = "page", defaultValue = "0") int page,
                                         @RequestParam(value = "size", defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return projectPostService.getAllProjectPosts(pageable);
    }

    @GetMapping("/{postId}")
    public ProjectPostDTO onePost(@PathVariable Long postId) {
        return projectPostService.getOneProjectPost(postId);
    }

    @PostMapping("/create")
    public ProjectPostDTO createPost(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestBody CreateProjectPostDTO dto) throws ExistsException, UnauthorizedException {
        Long userId = userDetails.getId();
        return projectPostService.createProjectPost(userId ,dto);
    }

    @PutMapping("/update")
    public void updatePost(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestBody UpdateProjectPostDTO dto) throws InvalidInputException, UnauthorizedException {
        Long userId = userDetails.getId();
        projectPostService.updateProjectPost(userId, dto);
    }

    @DeleteMapping("/delete/{postId}")
    public void deletePostId(@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable Long postId) throws UnauthorizedException {
        Long userId = userDetails.getId();
        projectPostService.deleteProjectPost(userId, postId);
    }

}
