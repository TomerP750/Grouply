package com.grouply.backend.connection_request;

import com.grouply.backend.exceptions.UnauthorizedException;
import com.grouply.backend.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/connection-request")
@RequiredArgsConstructor
public class ConnectionRequestController {

    private final ConnectionRequestService connectionRequestService;

    @PostMapping("/toggle/{recipientId}")
    public boolean toggleRequest(@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable Long recipientId) throws UnauthorizedException {
        Long userId = userDetails.getId();
        return connectionRequestService.toggleConnectionRequest(userId, recipientId);
    }

    @PostMapping("/accept/{senderId}")
    public void accept(@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable Long senderId) throws UnauthorizedException {
        Long userId = userDetails.getId();
        connectionRequestService.acceptRequest(userId, senderId);
    }

    @DeleteMapping("/decline/{senderId}")
    public void decline(@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable Long senderId) throws UnauthorizedException {
        Long userId = userDetails.getId();
        connectionRequestService.declineRequest(userId, senderId);
    }

}
