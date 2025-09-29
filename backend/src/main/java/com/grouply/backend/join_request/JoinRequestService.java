package com.grouply.backend.join_request;

import com.grouply.backend.exceptions.UnauthorizedException;
import com.grouply.backend.join_request.dto.JoinRequestDTO;
import com.grouply.backend.project.Project;
import com.grouply.backend.project.ProjectRepository;
import com.grouply.backend.project_member.ProjectMemberRepository;
import com.grouply.backend.project_member.ProjectRole;
import com.grouply.backend.project_post.ProjectPost;
import com.grouply.backend.project_post.ProjectPostRepository;
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
    private final ProjectPostRepository projectPostRepository;
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

    public boolean toggleJoinRequest(JoinRequestDTO dto) throws UnauthorizedException {

        User sender = fetchUser(dto.getSenderId());
        ProjectPost post = fetchProjectPost(dto.getProjectPostId());

        if (sender == null) {
            throw new UnauthorizedException("You must login to request to join");
        }

        if (joinRequestRepository.existsBySenderIdAndProjectPostId(sender.getId(), post.getId())) {
            JoinRequest existing = joinRequestRepository.findBySenderIdAndProjectPostId(sender.getId(), post.getId());
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
                .projectPost(post)
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

    private ProjectPost fetchProjectPost(Long postId) {
        return projectPostRepository.findById(postId).orElseThrow(() -> new NoSuchElementException("Post not found"));
    }

}
