package com.grouply.backend.features.connection.connection;

import com.grouply.backend.shared.exceptions.UnauthorizedException;
import com.grouply.backend.infrastructure.security.CustomUserDetails;
import com.grouply.backend.features.user.Dtos.UserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/all")
    public List<UserDTO> allConnections(@AuthenticationPrincipal CustomUserDetails userDetails) {
        Long userId = userDetails.getId();
        return connectionService.allConnectedUsers(userId);
    }

}
