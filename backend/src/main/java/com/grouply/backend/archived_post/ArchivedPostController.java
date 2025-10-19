package com.grouply.backend.archived_post;

import com.grouply.backend.exceptions.ExistsException;
import com.grouply.backend.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/archived")
@RequiredArgsConstructor
public class ArchivedPostController {

    private final ArchivedPostService archivedPostService;


    @PostMapping("/toggle/{postId}")
    public boolean toggleArchive(@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable Long postId) throws ExistsException {
        Long userId = userDetails.getId();
        return archivedPostService.toggleArchiveProject(userId, postId);
    }


}
