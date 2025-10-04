package com.grouply.backend.join_request;

import com.grouply.backend.project_member.ProjectPosition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface JoinRequestRepository extends JpaRepository<JoinRequest, Long> {


    Optional<JoinRequest> findBySenderIdAndPositionId(Long senderId, Long positionId);

    boolean existsBySenderIdAndPostIdAndPositionPosition(Long senderId, Long postId, ProjectPosition position);

    boolean existsBySenderIdAndPostIdAndPositionId(Long userId, Long postId, Long postPositionId);

    @Query("""
    SELECT CASE WHEN COUNT(jr) > 0 THEN true ELSE false END
    FROM JoinRequest jr
    WHERE jr.sender.id = :userId
      AND jr.post.id = :postId
      AND jr.position.position = :position
""")
    boolean existsByUserAndPostAndPositionName(
            @Param("userId") Long userId,
            @Param("postId") Long postId,
            @Param("position") ProjectPosition position);

}
