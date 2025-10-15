package com.grouply.backend.project_member;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface ProjectMemberRepository extends JpaRepository<ProjectMember, Long> {

    Optional<ProjectMember> findByIdAndProjectId(Long memberId, Long projectId);

//    @EntityGraph(attributePaths = {"user"})
//    List<ProjectMember> findByProjectId(Long projectId);

    int countByProjectIdAndProjectRole(Long projectId, ProjectRole role);

    @Transactional
    @Modifying
    void deleteByIdAndProjectId(Long memberToRemoveId, Long projectId);

    boolean existsByUserIdAndProjectIdAndProjectRole(Long userId, Long projectId, ProjectRole role);

    Optional<ProjectMember> findByUserIdAndProjectIdAndProjectRole(Long userId, Long projectId, ProjectRole role);

    boolean existsByUserIdAndProjectId(Long userId, Long projectId);

    List<ProjectMember> findByProjectId(Long projectId);

    Page<ProjectMember> findByProjectId(Long projectId, Pageable pageable);

    Optional<ProjectMember> findByUserIdAndProjectId(Long userId, Long projectId);
}
