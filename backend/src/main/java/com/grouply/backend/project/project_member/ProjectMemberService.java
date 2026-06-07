package com.grouply.backend.project.project_member;

import com.grouply.backend.project.project.ProjectService;
import com.grouply.backend.shared.exceptions.UnauthorizedException;
import com.grouply.backend.project.project.Project;
import com.grouply.backend.project.project_member.dto.ChangeMemberRoleDTO;
import com.grouply.backend.project.project_member.dto.ProjectMemberDTO;
import com.grouply.backend.shared.util.EntityToDtoMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProjectMemberService implements IProjectMemberService{

    private final ProjectMemberRepository projectMemberRepository;
    private final ProjectService projectService;


    /**
     * This is for post project where i want to fetch all the members at once so no pagination
     * @param projectId
     * @return
     */
    public List<ProjectMemberDTO> allProjectMembers(Long projectId) {
        return projectMemberRepository.findByProjectId(projectId).stream()
                .map(EntityToDtoMapper::toProjectMemberDto)
                .toList();
    }


    @Override
    public Page<ProjectMemberDTO> allProjectMembersPagination(Long projectId, Pageable pageable) {
        return projectMemberRepository
                .findByProjectId(projectId, pageable)
                .map(EntityToDtoMapper::toProjectMemberDto);
    }



    @Override
    public void changeMemberRole(Long userId, ChangeMemberRoleDTO dto) throws UnauthorizedException {

        log.info("Entering change member role");
        if (!isProjectOwner(userId, dto.getProjectId())) {
            throw new UnauthorizedException("You are not authorized to change member's user");
        }

        ProjectMember member = fetchProjectMember(dto.getMemberId(), dto.getProjectId());
        member.setProjectRole(dto.getRole());
        projectMemberRepository.save(member);
        log.info("Changed members role to: " + dto.getRole());
    }

    /**
     * Removes member from the project
     * @param ownerId
     * @param memberToRemoveId
     * @param projectId
     * @throws UnauthorizedException
     */
    @Override
    public void removeMemberFromProject(Long ownerId, Long memberToRemoveId, Long projectId) throws UnauthorizedException {
        if (!isProjectOwner(ownerId, projectId)) {
            throw new UnauthorizedException("You are not authorized to remove user");
        }

        ProjectMember memberToRemove = fetchProjectMember(memberToRemoveId, projectId);

        int ownerCount = projectMemberRepository
                .countByProjectIdAndProjectRole(projectId, ProjectRole.OWNER);

        if (memberToRemove.getProjectRole() == ProjectRole.OWNER && ownerCount <= 1) {
            throw new IllegalStateException("Project must have at least one owner");
        }

        Project project = projectService.fetchProject(projectId);
        project.getProjectMembers().remove(memberToRemove);

        projectMemberRepository.deleteByIdAndProjectId(memberToRemoveId, projectId);
    }




    public boolean isMember(Long userId, Long projectId) {
        return projectMemberRepository.existsByUserIdAndProjectId(userId, projectId);
    }

    public boolean isProjectOwner(Long userId, Long projectId) {
        return projectMemberRepository
                .existsByUserIdAndProjectIdAndProjectRole(userId, projectId, ProjectRole.OWNER);
    }


    private ProjectMember fetchProjectMember(Long memberId, Long projectId) {
        return projectMemberRepository
                .findByIdAndProjectId(memberId, projectId).orElseThrow(() -> new NoSuchElementException("Member not found"));
    }





}
