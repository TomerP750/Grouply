package com.grouply.backend.join_request;

import com.grouply.backend.join_request.dto.JoinRequestDTO;
import com.grouply.backend.project_member.ProjectPosition;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface JoinRequestRepository extends JpaRepository<JoinRequest, Long> {


    Optional<JoinRequest> findBySenderIdAndPositionId(Long senderId, Long positionId);

    boolean existsBySenderIdAndPostIdAndPositionPosition(Long senderId, Long postId, ProjectPosition position);

    boolean existsBySenderIdAndPostIdAndPositionId(Long userId, Long postId, Long postPositionId);

    Page<JoinRequest> findByPostId(Long postId, Pageable pageable);
}
