package com.grouply.backend.project.project;

import com.grouply.backend.project.project_member.ProjectRole;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {


    @Query(
            value = """
    SELECT DISTINCT p
    FROM Project p
    JOIN p.projectMembers pm
    WHERE pm.user.id = :userId
      AND pm.projectRole = :projectRole
  """
    )
    Page<Project> findOwnedProjects(
            @Param("userId") Long userId,
            @Param("projectRole") ProjectRole projectRole,
            Pageable pageable
    );

    @Query("""
    SELECT p
    FROM Project p
    JOIN p.projectMembers pm
    WHERE pm.user.id = :userId
      AND pm.projectRole = :projectRole
""")
    List<Project> findOwnedProjectsByUserList(
            @Param("userId") Long userId,
            @Param("projectRole") ProjectRole projectRole
    );

    @Query("""
    SELECT p
    FROM Project p
    JOIN p.projectMembers pm
    WHERE pm.user.id = :userId
      AND pm.projectRole = :projectRole
      AND p.status = :status
""")
    List<Project> findOwnedProjectsByUserRoleAndStatus(
            @Param("userId") Long userId,
            @Param("projectRole") ProjectRole projectRole,
            @Param("status") ProjectStatus status
    );


    @Query("""
    SELECT DISTINCT p
    FROM Project p
    JOIN p.projectMembers pmOwner
    LEFT JOIN Post po ON po.project = p
    WHERE pmOwner.user.id = :ownerId
      AND pmOwner.projectRole = :ownerRole
      AND po.id IS NULL
""")
    List<Project> findOwnedProjectsWithoutPosts(
            @Param("ownerId") Long ownerId,
            @Param("ownerRole") ProjectRole ownerRole
    );

}
