package com.grouply.backend.connection;

import com.grouply.backend.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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


}
