package com.grouply.backend.connection;

import com.grouply.backend.exceptions.UnauthorizedException;
import com.grouply.backend.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/connection")
@RequiredArgsConstructor
public class ConnectionController {

    private final ConnectionService connectionService;

    @GetMapping("/check/{visitedId}")
    public boolean checkConnected(@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable Long visitedId) {
        Long userId = userDetails.getId();
        return connectionService.areConnected(userId, visitedId);
    }

    @DeleteMapping("/remove/{removedUserId}")
    public boolean removeConnection(@AuthenticationPrincipal CustomUserDetails userDetails ,@PathVariable Long removedUserId) throws UnauthorizedException {
        Long userId = userDetails.getId();
        return connectionService.removeConnection(userId, removedUserId);
    }


}
