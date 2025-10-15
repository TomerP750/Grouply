package com.grouply.backend.invitation;

import com.grouply.backend.exceptions.UnauthorizedException;
import com.grouply.backend.invitation.dto.InviteUserToProjectDTO;
import com.grouply.backend.project.Dtos.ProjectDTO;
import com.grouply.backend.project_member.ProjectPosition;
import com.grouply.backend.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/invite")
@RequiredArgsConstructor
public class InvitationController {

    private final InvitationService invitationService;


    @GetMapping("/exists/{recipientId}")
    public boolean hasExistsInvitation(@PathVariable Long recipientId,
                                       @RequestParam(value = "projectId") Long projectId,
                                       @RequestParam(value = "position")ProjectPosition position) {
        return invitationService.hasSentInviteToProject(recipientId, projectId, position);
    }

    @PostMapping("/toggle")
    public boolean toggleInvite(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestBody InviteUserToProjectDTO dto) throws UnauthorizedException {
        Long userId = userDetails.getId();
        return invitationService.toggleInviteUserToProject(userId, dto);
    }

}
