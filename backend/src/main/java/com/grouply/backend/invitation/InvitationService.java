package com.grouply.backend.invitation;

import com.grouply.backend.exceptions.UnauthorizedException;
import com.grouply.backend.invitation.dto.InvitationResponseDTO;
import com.grouply.backend.invitation.dto.InviteUserToProjectDTO;
import com.grouply.backend.project.Project;
import com.grouply.backend.project.ProjectRepository;
import com.grouply.backend.project_member.ProjectMember;
import com.grouply.backend.project_member.ProjectMemberRepository;
import com.grouply.backend.project_member.ProjectPosition;
import com.grouply.backend.project_member.ProjectRole;
import com.grouply.backend.user.User;
import com.grouply.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@Slf4j
@RequiredArgsConstructor
public class InvitationService implements IInvitationService{

    private final InvitationRepository invitationRepository;
    private final ProjectMemberRepository projectMemberRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    /**
     * The ownerId is basically the user that requested to invite it comes from authenticationPrincipal
     * @param dto
     * @throws UnauthorizedException
     */
    @Override
    public boolean toggleInviteUserToProject(Long senderId ,InviteUserToProjectDTO dto) throws UnauthorizedException {

        ProjectMember owner = projectMemberRepository
                .findByUserIdAndProjectIdAndProjectRole(senderId, dto.getProjectId(), ProjectRole.OWNER)
                .orElseThrow(() -> new NoSuchElementException("Owner not found"));

        if (!isOwner(senderId, owner.getProject().getId())) {
            throw new UnauthorizedException("You are not allowed to invite");
        }

        boolean alreadyExists = hasSentInviteToProject(dto.getRecipientId(), dto.getProjectId(), dto.getPosition());
        if (alreadyExists) {
           Invitation existing = invitationRepository.findByRecipientIdAndProjectIdAndPosition(dto.getRecipientId(), dto.getProjectId(), dto.getPosition());
           invitationRepository.deleteById(existing.getId());
           return false;
        }

        User recipient = fetchUser(dto.getRecipientId());
        Project project = owner.getProject();

        Invitation invitation = Invitation.builder()
                .sender(owner)
                .recipient(recipient)
                .project(project)
                .position(dto.getPosition())
                .status(InvitationStatus.PENDING)
                .build();
        invitationRepository.save(invitation);
        return true;
    }


    public boolean hasSentInviteToProject(Long recipientId, Long projectId, ProjectPosition position) {
        return invitationRepository.existsByRecipientIdAndProjectIdAndPosition(recipientId, projectId, position);
    }



    /**
     * In this method i am the recipient in contrast to the invite where i am the owner
     * @param dto
     */
    @Override
    public void responseToInvitation(InvitationResponseDTO dto) {

        User recipient = fetchUser(dto.getRecipientId());
        Invitation invitation = invitationRepository.findById(dto.getInvitationId()).orElseThrow(() -> new NoSuchElementException("Not found"));

        switch (dto.getResponse()) {
            case ACCEPTED:
                ProjectMember newMember = buildProjectMember(recipient, invitation.getPosition() ,invitation.getProject());
                projectMemberRepository.save(newMember);
                break;

            case DECLINED:
                invitation.setStatus(InvitationStatus.DECLINED);
                invitationRepository.deleteById(dto.getInvitationId());
                break;
        }

    }






    // HELPER METHODS


    private boolean isOwner(Long userId, Long projectId) {
        return projectMemberRepository
                .existsByUserIdAndProjectIdAndProjectRole(userId, projectId, ProjectRole.OWNER);
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
