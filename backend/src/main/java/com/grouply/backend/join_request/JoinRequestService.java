package com.grouply.backend.join_request;

import com.grouply.backend.exceptions.ExistsException;
import com.grouply.backend.exceptions.UnauthorizedException;
import com.grouply.backend.join_request.dto.JoinRequestDTO;
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

    /**
     *
     * @param dto
     * @return
     * @throws UnauthorizedException
     */

    public boolean toggleJoinRequest(JoinRequestDTO dto) throws UnauthorizedException, ExistsException {

        User sender = fetchUser(dto.getSenderId());
        Post post = fetchProjectPost(dto.getProjectPostId());

        if (sender == null) {
            throw new UnauthorizedException("You must login to request to join");
        }

        if (projectMemberRepository.existsByUserIdAndProjectId(sender.getId(), post.getProject().getId())) {
            throw new ExistsException("You are already a member in the project");
        }

        if (joinRequestRepository.existsBySenderIdAndPostId(sender.getId(), post.getId())) {
            JoinRequest existing = joinRequestRepository.findBySenderIdAndPostId(sender.getId(), post.getId());
            joinRequestRepository.deleteById(existing.getId());
            return false;
        }

        ProjectPostPosition position = projectPostPositionRepository
                .findById(dto.getProjectPostPositionId())
                .orElseThrow(() -> new NoSuchElementException("Position not found"));

        JoinRequest joinRequest = JoinRequest.builder()
                .sender(sender)
                .status(RequestStatus.PENDING)
                .position(position)
                .post(post)
                .build();

        joinRequestRepository.save(joinRequest);
        return true;
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
