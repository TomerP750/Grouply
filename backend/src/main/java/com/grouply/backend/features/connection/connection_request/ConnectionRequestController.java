package com.grouply.backend.features.connection.connection_request;

import com.grouply.backend.features.connection.connection_request.dto.ConnectionRequestDTO;
import com.grouply.backend.shared.exceptions.UnauthorizedException;
import com.grouply.backend.infrastructure.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/connection-request")
@RequiredArgsConstructor
public class ConnectionRequestController {

    private final ConnectionRequestService connectionRequestService;

    @GetMapping("/all")
    public Page<ConnectionRequestDTO> allRequests(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                  @RequestParam(value = "page", defaultValue = "0") int page,
                                                  @RequestParam(value = "size", defaultValue = "10") int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        Long userId = userDetails.getId();
        return connectionRequestService.allConnectionRequests(userId, pageRequest);
    }

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


    @GetMapping("/incoming/{visitedId}")
    public boolean hasPendingRequestByVisitedUser(@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable Long visitedId) {
        Long userId = userDetails.getId();
        return connectionRequestService.hasPendingRequestFromVisitedUser(userId, visitedId);
    }

}
