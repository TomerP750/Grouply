package com.grouply.backend.join_request;

import com.grouply.backend.join_request.dto.JoinRequestDTO;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JoinRequestRepository extends JpaRepository<JoinRequest, Long> {


    boolean existsBySenderIdAndProjectPostId(Long senderId, Long postId);

    JoinRequest findBySenderIdAndProjectPostId(Long senderId, Long postId);
}
