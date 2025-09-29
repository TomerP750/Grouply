package com.grouply.backend.join_request;

import com.grouply.backend.exceptions.ExistsException;
import com.grouply.backend.exceptions.UnauthorizedException;
import com.grouply.backend.join_request.dto.JoinRequestDTO;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/join")
@RequiredArgsConstructor
public class JoinRequestController {

    private static final Logger log = LoggerFactory.getLogger(JoinRequestController.class);
    private final JoinRequestService joinRequestService;

    @PostMapping("/request")
    public boolean requestToJoin(@RequestBody JoinRequestDTO dto) throws UnauthorizedException, ExistsException {
        return joinRequestService.toggleJoinRequest(dto);
    }
}
