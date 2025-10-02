package com.grouply.backend.project_post;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectPostRepository extends JpaRepository<ProjectPost, Long> {
    boolean existsByProjectId(Long projectId);

    ProjectPost findByProjectId(Long projectId);
}
