package com.grouply.backend.join_request;

import com.grouply.backend.exceptions.ExistsException;
import com.grouply.backend.exceptions.UnauthorizedException;
import com.grouply.backend.join_request.dto.JoinRequestDTO;
//import com.grouply.backend.notification.NotificationService;
import com.grouply.backend.notification.NotificationType;
import com.grouply.backend.project.Project;
import com.grouply.backend.project.ProjectRepository;
import com.grouply.backend.project_member.ProjectMemberRepository;
import com.grouply.backend.project_member.ProjectRole;
import com.grouply.backend.post.Post;
import com.grouply.backend.post.PostRepository;
import com.grouply.backend.project_post_position.ProjectPostPosition;
import com.grouply.backend.project_post_position.ProjectPostPositionRepository;
import com.grouply.backend.user.User;
import com.grouply.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class JoinRequestService {

    private final JoinRequestRepository joinRequestRepository;
    private final PostRepository postRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final ProjectMemberRepository projectMemberRepository;
    private final ProjectPostPositionRepository projectPostPositionRepository;
//    private final NotificationService notificationService;

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

    public boolean toggleJoinRequest(JoinRequestDTO dto) throws UnauthorizedException, ExistsException {

        User sender = fetchUser(dto.getSenderId());

        if (sender == null) {
            throw new UnauthorizedException("You must login to request to join");
        }

        Post post = fetchProjectPost(dto.getProjectPostId());
        ProjectPostPosition position = projectPostPositionRepository.findById(dto.getProjectPostPositionId()).orElseThrow(() -> new NoSuchElementException("Position not found"));

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


        return true;
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

//    ----------- HELPER METHODS -----------

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

    private Post fetchProjectPost(Long postId) {
        return postRepository.findById(postId).orElseThrow(() -> new NoSuchElementException("Post not found"));
    }

}
