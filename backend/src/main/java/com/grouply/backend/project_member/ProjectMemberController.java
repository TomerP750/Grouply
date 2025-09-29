package com.grouply.backend.project_member;

import com.grouply.backend.project_member.dto.ProjectMemberDTO;
import com.grouply.backend.util.EntityToDtoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
public class ProjectMemberController {

    private final ProjectMemberRepository projectMemberRepository;
    private final ProjectMemberService projectMemberService;

    @GetMapping("/{id}")
    public ProjectMemberDTO getOne(@PathVariable Long id) {
        return EntityToDtoMapper.toProjectMemberDto(projectMemberRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Not found")));
    }

    @GetMapping("/all/{id}")
    public List<ProjectMemberDTO> allMembers(@PathVariable Long id) {
        return projectMemberService.allProjectMembers(id);
    }

    @GetMapping("/isMember/{userId}/{projectId}")
    public boolean isMember(@PathVariable Long userId, @PathVariable Long projectId) {
        return projectMemberService.isMember(userId, projectId);
    }

    @GetMapping("/isOwner/{userId}/{projectId}")
    public boolean isOwner(@PathVariable Long userId, @PathVariable Long projectId) {
        return projectMemberService.isOwner(userId, projectId);
    }



}
