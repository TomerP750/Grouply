package com.grouply.backend.archived_post;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ArchivedPostRepository extends JpaRepository<ArchivedPost, Long> {
    boolean existsByUserIdAndPostId(Long userId, Long projectId);


    Optional<ArchivedPost> findByUserIdAndPostId(Long userId, Long postId);
}
