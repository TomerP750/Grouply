package com.grouply.backend.activity;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityRepository extends JpaRepository<Activity, Long> {

    long countByUserId(Long userId);

    Activity findTopByUserIdOrderByCreatedAtAsc(Long userId);
}
