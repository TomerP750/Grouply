package com.grouply.backend.project_member;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProjectMemberRepository extends JpaRepository<ProjectMember, Long> {
    Optional<ProjectMember> findByUserIdAndProjectIdAndProjectRole(Long userId, Long projectId, ProjectRole projectRole);

    Optional<ProjectMember> findByIdAndProjectId(Long memberId, Long projectId);
}
