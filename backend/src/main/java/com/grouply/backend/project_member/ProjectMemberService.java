package com.grouply.backend.project_member;

import com.grouply.backend.archived_project.ArchivedProject;
import com.grouply.backend.exceptions.UnauthorizedException;
import com.grouply.backend.project.Project;
import com.grouply.backend.project.ProjectRepository;
import com.grouply.backend.user.User;
import com.grouply.backend.user.UserRepository;
import com.grouply.backend.util.EntityToDtoMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProjectMemberService implements IProjectMemberService{

    private final ProjectMemberRepository projectMemberRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;




    @Override
    public void removeMemberFromProject(Long ownerId, Long memberToRemoveId, Long projectId) throws UnauthorizedException {
        if (!isOwner(ownerId, projectId)) {
            throw new UnauthorizedException("You are not authorized to remove user");
        }

        ProjectMember memberToRemove = fetchProjectMember(memberToRemoveId, projectId);

        int ownerCount = projectMemberRepository
                .countByProjectIdAndProjectRole(projectId, ProjectRole.OWNER);

        if (memberToRemove.getProjectRole() == ProjectRole.OWNER && ownerCount <= 1) {
            throw new IllegalStateException("Project must have at least one owner");
        }

        Project project = fetchProject(projectId);
        project.getProjectMembers().remove(memberToRemove);

        projectMemberRepository.deleteByIdAndProjectId(memberToRemoveId, projectId);
    }

    @Override
    public void requestToJoinProject(Long userId, Long ownerId, Long projectId) {

    }





    // HELPER METHODS

    private boolean isOwner(Long userId, Long projectId) {
        return projectMemberRepository
                .existsByUserIdAndProjectIdAndProjectRole(userId, projectId, ProjectRole.OWNER);
    }

    private ProjectMember fetchProjectMember(Long memberId, Long projectId) {
        return projectMemberRepository
                .findByIdAndProjectId(memberId, projectId).orElseThrow(() -> new NoSuchElementException("Member not found"));
    }

    private Project fetchProject(Long projectId) {
        return projectRepository.findById(projectId).orElseThrow(()->new NoSuchElementException("Project not found"));
    }

    private User fetchUser(Long userId) {
        return userRepository.findById(userId).orElseThrow(()->new NoSuchElementException("User not found"));
    }

    private ProjectMember buildProjectMember(User user, ProjectPosition position, Project project) {
        return ProjectMember.builder()
                .user(user)
                .project(project)
                .projectRole(ProjectRole.MEMBER)
                .projectPosition(position)
                .build();
    }

}
