package com.grouply.backend.technology;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TechnologyRepository extends JpaRepository<Technology, Long> {

    @Query("""
    select t
    from Technology t
    where not exists (
      select p
      from Post p
      where t not member of p.project.technologies
    )
  """)
    List<Technology> findAllUsedTechsInPosts();

}
