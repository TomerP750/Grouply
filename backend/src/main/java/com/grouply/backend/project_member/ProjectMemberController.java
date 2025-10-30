package com.grouply.backend.project_member;

import com.grouply.backend.exceptions.UnauthorizedException;
import com.grouply.backend.project_member.dto.ChangeMemberRoleDTO;
import com.grouply.backend.project_member.dto.ProjectMemberDTO;
import com.grouply.backend.security.CustomUserDetails;
import com.grouply.backend.util.EntityToDtoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
public class ProjectMemberController {

    private final ProjectMemberService projectMemberService;

    @GetMapping("/all/{id}")
    public List<ProjectMemberDTO> allMembersByProjectId(@PathVariable Long id) {
        return projectMemberService.allProjectMembers(id);
    }


    @GetMapping("/allPage/{id}")
    public Page<ProjectMemberDTO> allMembersByProjectId(@PathVariable Long id,
                                                        @RequestParam(value = "page", defaultValue = "0") int page,
                                                        @RequestParam(value = "size", defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return projectMemberService.allProjectMembersPagination(id, pageable);
    }

    @GetMapping("/isMember/{userId}/{projectId}")
    public boolean isMember(@PathVariable Long userId, @PathVariable Long projectId) {
        return projectMemberService.isMember(userId, projectId);
    }

    @GetMapping("/isOwner/{userId}/{projectId}")
    public boolean isOwner(@PathVariable Long userId, @PathVariable Long projectId) {
        return projectMemberService.isOwner(userId, projectId);
    }

    @PatchMapping("/changeRole/{memberId}")
    public void changeMemberRole(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestBody ChangeMemberRoleDTO dto) throws UnauthorizedException {
        Long userId = userDetails.getId();
        projectMemberService.changeMemberRole(userId, dto);
    }

    @DeleteMapping("/remove/{memberId}/{projectId}")
    public void removeMemberFromProject(@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable Long memberId ,@PathVariable Long projectId) throws UnauthorizedException {
        Long userId = userDetails.getId();
        projectMemberService.removeMemberFromProject(userId, memberId, projectId);
    }




}
