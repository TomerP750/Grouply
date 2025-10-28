package com.grouply.backend.activity;

import com.grouply.backend.activity.dto.ActivityDTO;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Arrays;
import java.util.List;

public interface ActivityRepository extends JpaRepository<Activity, Long> {

    long countByUserId(Long userId);

    Activity findTopByUserIdOrderByCreatedAtAsc(Long userId);

    List<Activity> findByUserId(Long userid);

    List<Activity> findAllByUserIdOrderByCreatedAtDesc(Long userid);
}
