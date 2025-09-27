package com.grouply.backend.archived_project;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ArchivedProjectRepository extends JpaRepository<ArchivedProject, Long> {
    boolean existsByUserIdAndProjectId(Long userId, Long projectId);

    Optional<ArchivedProject> findByUserIdAndProjectId(Long userId, Long projectId);
}
