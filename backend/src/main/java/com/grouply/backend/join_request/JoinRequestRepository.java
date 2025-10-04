package com.grouply.backend.join_request;

import com.grouply.backend.project_post_position.ProjectPostPosition;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JoinRequestRepository extends JpaRepository<JoinRequest, Long> {


    boolean existsBySenderIdAndPostId(Long senderId, Long postId);

    JoinRequest findBySenderIdAndPostId(Long senderId, Long postId);

    boolean existsBySenderIdAndPostIdAndPositionId(Long userId, Long postId, Long postPositionId);
}
