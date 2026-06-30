package com.grouply.backend.features.join_request;

import com.grouply.backend.features.activity.ActivityService;
import com.grouply.backend.features.activity.ActivityType;
import com.grouply.backend.features.join_request.dto.RequestToJoinDTO;
import com.grouply.backend.features.post.archived_post.ArchivedPost;
import com.grouply.backend.features.post.archived_post.ArchivedPostRepository;
import com.grouply.backend.features.post.post.PostService;
import com.grouply.backend.features.project.project_member.ProjectMemberService;
import com.grouply.backend.features.user.UserService;
import com.grouply.backend.shared.exceptions.ExistsException;
import com.grouply.backend.shared.exceptions.UnauthorizedException;
import com.grouply.backend.features.join_request.dto.JoinRequestDTO;
import com.grouply.backend.features.post.post.Post;
import com.grouply.backend.features.project.project.Project;
import com.grouply.backend.features.project.project.ProjectRepository;
import com.grouply.backend.features.project.project_member.ProjectMember;
import com.grouply.backend.features.project.project_member.ProjectMemberRepository;
import com.grouply.backend.features.project.project_member.ProjectRole;
import com.grouply.backend.features.post.project_post_position.ProjectPostPosition;
import com.grouply.backend.features.post.project_post_position.ProjectPostPositionRepository;
import com.grouply.backend.features.user.User;
import com.grouply.backend.shared.util.EntityToDtoMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class JoinRequestService {

    private final JoinRequestRepository joinRequestRepository;
    private final ProjectRepository projectRepository;
    private final ProjectMemberRepository projectMemberRepository;
    private final ProjectPostPositionRepository projectPostPositionRepository;
    private final ActivityService activityService;
    private final ArchivedPostRepository archivedPostRepository;
    private final UserService userService;
    private final PostService postService;
    private final ProjectMemberService projectMemberService;

    /**
     * Toggles a join request for a given post position.
     *
     * Logic summary:
     * - Validates that the user is authenticated.
     * - Ensures the user is not already a member of the project.
     * - If the user has already applied for the same position in the same post,
     *   an exception is thrown to prevent duplicate requests.
     * - If a join request already exists for the same user and position row,
     *   it is deleted (the request is canceled) and false is returned.
     * - Otherwise, a new join request is created and true is returned.
     *
     * @param dto the JoinRequestDTO containing sender ID, post ID, and position ID
     * @return true if a new join request was created; false if an existing one was removed
     * @throws UnauthorizedException if the user is not logged in or attempts an invalid duplicate request
     * @throws ExistsException if the user is already a member of the project
     * @throws NoSuchElementException if the specified position does not exist
     */

    public boolean toggleJoinRequest(RequestToJoinDTO dto) throws UnauthorizedException, ExistsException {

        User sender = userService.findOneUser(dto.senderId());

        if (sender == null) {
            throw new UnauthorizedException("You must login to request to join");
        }

        Post post = postService.findOnePost(dto.postId());
        ProjectPostPosition position = projectPostPositionRepository.findById(dto.projectPostPositionId()).orElseThrow(() -> new NoSuchElementException("Position not found"));

        if (projectMemberRepository.existsByUserIdAndProjectId(sender.getId(), post.getProject().getId())) {
            throw new ExistsException("You are already a member in the project");
        }

        Optional<JoinRequest> existingForThisRow =
                joinRequestRepository.findBySenderIdAndPositionId(sender.getId(), position.getId());

        if (existingForThisRow.isPresent()) {
            joinRequestRepository.deleteById(existingForThisRow.get().getId());
            return false;
        }

        boolean sameEnumExists =
                joinRequestRepository.existsBySenderIdAndPostIdAndPositionPosition(
                        sender.getId(), post.getId(), position.getPosition());

        if (sameEnumExists) {
            throw new ExistsException("You have already applied for the " +
                    position.getPosition() + " position in this post.");
        }


        JoinRequest joinRequest = JoinRequest.builder()
                .sender(sender)
                .status(RequestStatus.PENDING)
                .position(position)
                .post(post)
                .build();

        joinRequestRepository.save(joinRequest);


        //TODO remove activity if cancel the join request

        activityService
                .createActivity("You sent join request to " + " " + post.getProject().getName() + " to position: " + position.getPosition()
                        ,"/post/"+post.getId()
                        , ActivityType.SENT_JOIN_REQUEST
                        , sender.getId());
        return true;
    }

    /**
     * Accepting join request from the sender, if the sender have archived the post of the project, it will remove it from archived
     * @param userId
     * @param joinRequestId
     * @throws UnauthorizedException
     */

    public void acceptJoinRequest(Long userId, Long joinRequestId) throws UnauthorizedException {

        JoinRequest joinRequest = fetchJoinRequest(joinRequestId);
        Project project = joinRequest.getPost().getProject();

        // im using userId only to check authority
        if (!projectMemberService.isProjectOwner(userId, project.getId())) {
            throw new UnauthorizedException("Unauthorized to response");
        }

        log.info("Starting to create member");

        User sender = userService.findOneUser(joinRequest.getSender().getId());
        ProjectMember newMember = ProjectMember.builder()
                .user(sender)
                .projectRole(ProjectRole.MEMBER)
                .projectPosition(joinRequest.getPosition().getPosition())
                .project(project)
                .build();
        project.getProjectMembers().add(newMember);
        projectRepository.save(project);

        //TODO UX check if i should remove from archive after i get accepted
        if (archivedPostRepository.existsByUserIdAndPostId(joinRequest.getSender().getId(), project.getId())) {
            log.info("Archived post found");
            ArchivedPost archivedPost = archivedPostRepository
                    .findByUserIdAndPostId(joinRequest.getSender().getId(), project.getId()).orElseThrow(() -> new NoSuchElementException("Archived post not found"));
            archivedPostRepository.deleteById(archivedPost.getId());
            log.info("Deleted archived post because archiver join the project");
        }

        joinRequestRepository.deleteById(joinRequestId);

        log.info("Created new member!");

    }

    /**
     * Decline a join request from a sender, it removes only the request from the database
     * @param userId
     * @param joinRequestId
     * @throws UnauthorizedException
     */
    public void declineJoinRequest(Long userId, Long joinRequestId) throws UnauthorizedException {

        log.info("Entering decline join request");
        JoinRequest joinRequest = fetchJoinRequest(joinRequestId);
        Project project = joinRequest.getPost().getProject();

        if (!projectMemberService.isProjectOwner(userId, project.getId())) {
            throw new UnauthorizedException("Unauthorized to response");
        }

        joinRequestRepository.deleteById(joinRequestId);
        log.info("Declined join request");
    }


    /**
     * this checks if the user has sent a join request to a specific position in a post
     * @param userId
     * @param postId
     * @param postPositionId
     * @return
     */
    public boolean appliedToPostPosition(Long userId, Long postId, Long postPositionId) {
        return joinRequestRepository.existsBySenderIdAndPostIdAndPositionId(userId, postId, postPositionId);
    }

    public Page<JoinRequestDTO> allRequestsByPost(Long postId, Pageable pageable) {
        Page<JoinRequest> requests = joinRequestRepository.findByPostId(postId, pageable);
        return requests.map(EntityToDtoMapper::toJoinRequestDto);
    }

    private JoinRequest fetchJoinRequest(Long requestId) {
        return joinRequestRepository.findById(requestId).orElseThrow(()->new NoSuchElementException("Request not found"));
    }


}
