package com.grouply.backend.post;

import com.grouply.backend.project_member.ProjectPosition;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    boolean existsByProjectId(Long projectId);

    Post findByProjectId(Long projectId);

    Page<Post> findAllByOrderByPostedAtDesc(Pageable pageable);

    @Query(
            value = """
      select distinct p
      from Post p
      left join p.positions ppp
      where (:roles is null or ppp.position in :roles)
      order by p.postedAt desc
    """,
            countQuery = """
      select count(distinct p)
      from Post p
      left join p.positions ppp
      where (:roles is null or ppp.position in :roles)
    """
    )
    Page<Post> findAllFiltered(
            @Param("roles") List<ProjectPosition> roles,
            Pageable pageable
    );
}
