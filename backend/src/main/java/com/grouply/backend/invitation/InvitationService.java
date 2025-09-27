//package com.grouply.backend.invitation;
//
//import com.grouply.backend.exceptions.UnauthorizedException;
//import com.grouply.backend.project.Project;
//import com.grouply.backend.project.ProjectRepository;
//import com.grouply.backend.project_member.ProjectMember;
//import com.grouply.backend.project_member.ProjectMemberRepository;
//import com.grouply.backend.project_member.ProjectPosition;
//import com.grouply.backend.project_member.ProjectRole;
//import com.grouply.backend.user.User;
//import com.grouply.backend.user.UserRepository;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.stereotype.Service;
//
//import java.util.NoSuchElementException;
//
//@Service
//@Slf4j
//@RequiredArgsConstructor
//public class InvitationService implements IInvitationService{
//
//    private final InvitationRepository invitationRepository;
//    private final ProjectMemberRepository projectMemberRepository;
//    private final ProjectRepository projectRepository;
//    private final UserRepository userRepository;
//
//    /**
//     * The ownerId is basically the user that requested to invite it comes from authenticationPrincipal
//     * @param senderId
//     * @param recipientId
//     * @param projectId
//     * @throws UnauthorizedException
//     */
//    @Override
//    public boolean toggleInviteUserToProject(Long senderId, Long recipientId, Long projectId, ProjectPosition position) throws UnauthorizedException {
//
//        ProjectMember owner = projectMemberRepository.findByUserIdAndProjectIdAndProjectRole(senderId, projectId, ProjectRole.OWNER);
//
//        if (!isOwner(owner.getId(), owner.getProject().getId())) {
//            throw new UnauthorizedException("You are not allowed to invite");
//        }
//
//        boolean invitationExists = invitationRepository.existsBySenderIdAndRecipientIdAndProjectId(senderId, recipientId, projectId);
//        if (invitationExists) {
//           Invitation existing = invitationRepository.findBySenderIdAndRecipientIdAndProjectId(senderId, recipientId, projectId);
//           invitationRepository.deleteById(existing.getId());
//           return false;
//        }
//
//        User recipient = fetchUser(recipientId);
//        Project project = owner.getProject();
//
//        Invitation invitation = Invitation.builder()
//                .senderId(owner)
//                .recipient(recipient)
//                .project(project)
//                .position(position)
//                .status(InvitationStatus.PENDING)
//                .build();
//        invitationRepository.save(invitation);
//        return true;
//    }
//
//
//    /**
//     * In this method i am the recipient in contrast to the invite where i am the owner
//     * @param recipientId
//     */
//    @Override
//    public void responseToInvitation(Long recipientId, Long invitationId ,InvitationStatus response) {
//
//        User recipient = fetchUser(recipientId);
//        Invitation invitation = invitationRepository.findById(invitationId).orElseThrow(() -> new NoSuchElementException("Not found"));
//
//        switch (response) {
//            case ACCEPTED:
//                ProjectMember newMember = buildProjectMember(recipient, invitation.getPosition() ,invitation.getProject());
//                projectMemberRepository.save(newMember);
//                break;
//
//            case DECLINED:
//                invitation.setStatus(InvitationStatus.DECLINED);
//                invitationRepository.deleteById(invitationId);
//                break;
//        }
//
//    }
//
//
//
//
//
//
//    // HELPER METHODS
//
//
//    private boolean isOwner(Long userId, Long projectId) {
//        return projectMemberRepository
//                .existsByUserIdAndProjectIdAndProjectRole(userId, projectId, ProjectRole.OWNER);
//    }
//
//    private ProjectMember fetchProjectMember(Long memberId, Long projectId) {
//        return projectMemberRepository
//                .findByIdAndProjectId(memberId, projectId).orElseThrow(() -> new NoSuchElementException("Member not found"));
//    }
//
//    private Project fetchProject(Long projectId) {
//        return projectRepository.findById(projectId).orElseThrow(()->new NoSuchElementException("Project not found"));
//    }
//
//    private User fetchUser(Long userId) {
//        return userRepository.findById(userId).orElseThrow(()->new NoSuchElementException("User not found"));
//    }
//
//    private ProjectMember buildProjectMember(User user, ProjectPosition position, Project project) {
//        return ProjectMember.builder()
//                .user(user)
//                .project(project)
//                .projectRole(ProjectRole.MEMBER)
//                .projectPosition(position)
//                .build();
//    }
//}
