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


}
