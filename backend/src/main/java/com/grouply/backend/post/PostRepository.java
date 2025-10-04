package com.grouply.backend.post;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
    boolean existsByProjectId(Long projectId);

    Post findByProjectId(Long projectId);
}
