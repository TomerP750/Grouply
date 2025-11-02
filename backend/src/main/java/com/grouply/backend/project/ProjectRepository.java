package com.grouply.backend.project;

import com.grouply.backend.project_member.ProjectRole;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    @Query("SELECT p FROM Project p " +
            "JOIN p.projectMembers pm " +
            "WHERE pm.user.id = :userId AND pm.projectRole = :projectRole")
    Page<Project> getUserOwnedProjects(@Param("userId") Long userId,
                                       @Param("projectRole") ProjectRole projectRole,
                                       Pageable pageable);


    @Query("SELECT p FROM Project p " +
            "JOIN p.projectMembers pm " +
            "WHERE pm.user.id = :userId AND pm.projectRole = :projectRole")
    List<Project> getAllUserOwnedProjects(@Param("userId") Long userId,
                                       @Param("projectRole") ProjectRole projectRole);


    @Query("""
    SELECT DISTINCT p
    FROM Project p
    JOIN p.projectMembers pmOwner
    WHERE pmOwner.user.id = :ownerId
    AND pmOwner.projectRole = :ownerRole
    AND NOT EXISTS (
      SELECT 1 FROM ProjectMember pm
      WHERE pm.project = p
      AND pm.user.id = :recipientId
    )
""")
    List<Project> findOwnedProjectsWhereUserNotMember(
            @Param("ownerId") Long ownerId,
            @Param("recipientId") Long recipientId,
            @Param("ownerRole") ProjectRole ownerRole
    );

    @Query("""
    SELECT DISTINCT p
    FROM Project p
    JOIN p.projectMembers pmOwner
    WHERE pmOwner.user.id = :ownerId
      AND pmOwner.projectRole = :ownerRole
      AND NOT EXISTS (
          SELECT 1
          FROM Post po
          WHERE po.project = p
      )
""")
    List<Project> findOwnedProjectsWithNoPosts(
            @Param("ownerId") Long ownerId,
            @Param("ownerRole") ProjectRole ownerRole
    );






}
