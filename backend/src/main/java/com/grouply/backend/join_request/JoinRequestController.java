package com.grouply.backend.join_request;

import com.grouply.backend.exceptions.UnauthorizedException;
import com.grouply.backend.join_request.dto.JoinRequestDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/join")
@RequiredArgsConstructor
public class JoinRequestController {

    private final JoinRequestService joinRequestService;

    @PostMapping("/request")
    public void requestToJoin(@RequestBody JoinRequestDTO dto) throws UnauthorizedException {
        joinRequestService.createJoinRequest(dto);
    }
}
