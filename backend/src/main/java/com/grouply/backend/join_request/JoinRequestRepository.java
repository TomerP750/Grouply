package com.grouply.backend.join_request;

import org.springframework.data.jpa.repository.JpaRepository;

public interface JoinRequestRepository extends JpaRepository<JoinRequest, Long> {


    boolean existsBySenderIdAndPostId(Long senderId, Long postId);

    JoinRequest findBySenderIdAndPostId(Long senderId, Long postId);
}
