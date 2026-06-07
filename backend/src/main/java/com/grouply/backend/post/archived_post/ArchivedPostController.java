package com.grouply.backend.post.archived_post;

import com.grouply.backend.shared.exceptions.ExistsException;
import com.grouply.backend.post.post.dto.PostDTO;
import com.grouply.backend.infrastructure.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/archived")
@RequiredArgsConstructor
public class ArchivedPostController {

    private final ArchivedPostService archivedPostService;

    @GetMapping("/all")
    public Page<PostDTO> allArchived(@AuthenticationPrincipal CustomUserDetails userDetails,
                                     @RequestParam(value = "page", defaultValue = "0") int page,
                                     @RequestParam(value = "size", defaultValue = "10") int size
                                             ) {
        Long userId = userDetails.getId();
        Pageable pageable = PageRequest.of(page, size);
        return archivedPostService.allArchivedPosts(userId, pageable);
    }

    @PostMapping("/toggle/{postId}")
    public boolean toggleArchive(@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable Long postId) throws ExistsException {
        Long userId = userDetails.getId();
        return archivedPostService.toggleArchiveProject(userId, postId);
    }

    @GetMapping("/isArchived/{postId}")
    public boolean isPostArchived(@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable Long postId) {
        Long userId = userDetails.getId();
        return archivedPostService.isPostArchived(userId, postId);
    }

}
