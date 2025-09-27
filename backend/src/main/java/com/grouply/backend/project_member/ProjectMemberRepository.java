package com.grouply.backend.project_member;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface ProjectMemberRepository extends JpaRepository<ProjectMember, Long> {

    Optional<ProjectMember> findByIdAndProjectId(Long memberId, Long projectId);

    int countByProjectIdAndProjectRole(Long projectId, ProjectRole role);

    @Transactional
    @Modifying
    void deleteByIdAndProjectId(Long memberToRemoveId, Long projectId);

    boolean existsByUserIdAndProjectIdAndProjectRole(Long userId, Long projectId, ProjectRole role);

    ProjectMember findByUserIdAndProjectIdAndProjectRole(Long userId, Long projectId, ProjectRole role);
}
