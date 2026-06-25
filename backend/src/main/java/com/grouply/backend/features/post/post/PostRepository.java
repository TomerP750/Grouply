package com.grouply.backend.features.post.post;

import com.grouply.backend.features.project.project_member.ProjectRole;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PostRepository extends JpaRepository<Post, Long> {

    boolean existsByProjectId(Long projectId);

    Post findByProjectId(Long projectId);

    Page<Post> findAllByOrderByPostedAtDesc(Pageable pageable);


    @Query(
            value = """
    select distinct p
    from Post p
    join p.project pr
    join pr.projectMembers pm
    where pm.user.id = :userId
      and pm.projectRole = :role
  """
    )
    Page<Post> findAllPostsWhereIsProjectOwner(
            @Param("userId") Long userId,
            @Param("role") ProjectRole role,
            Pageable pageable
    );

}
