package com.grouply.backend.invitation;

import com.grouply.backend.project.Dtos.ProjectDTO;
import com.grouply.backend.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/invite")
@RequiredArgsConstructor
public class InvitationController {

    private final InvitationService invitationService;


//    @GetMapping("/all/{recipientId}")
//    public List<ProjectDTO> allProjectsToInvite(@AuthenticationPrincipal CustomUserDetails userDetails,
//                                                @PathVariable Long recipientId) {
//        Long userId = userDetails.getId();
//        return invitationService.projectsToInvite(userId, recipientId);
//    }

}
