package com.grouply.backend.join_request;

import com.grouply.backend.exceptions.ExistsException;
import com.grouply.backend.exceptions.UnauthorizedException;
import com.grouply.backend.join_request.dto.JoinRequestDTO;
import com.grouply.backend.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/join")
@RequiredArgsConstructor
public class JoinRequestController {

    private final JoinRequestService joinRequestService;

    @GetMapping("/all/{postId}")
    public Page<JoinRequestDTO> allRequests(@PathVariable Long postId,
                                            @RequestParam(value = "page", defaultValue = "0") int page,
                                            @RequestParam(value = "size", defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return joinRequestService.allRequestsByPost(postId, pageable);
    }

    @PostMapping("/request")
    public boolean requestToJoin(@RequestBody JoinRequestDTO dto) throws UnauthorizedException, ExistsException {
        return joinRequestService.toggleJoinRequest(dto);
    }

    @GetMapping("/applied/{postId}/{positionId}")
    public boolean checkApplied(@AuthenticationPrincipal CustomUserDetails userDetails,
                                @PathVariable Long postId,
                                @PathVariable Long positionId) {
        Long userId = userDetails.getId();
        return joinRequestService.appliedToPostPosition(userId, postId, positionId);
    }
}
