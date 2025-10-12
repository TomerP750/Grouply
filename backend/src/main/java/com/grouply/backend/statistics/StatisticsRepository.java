package com.grouply.backend.statistics;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StatisticsRepository extends JpaRepository<Statistics, Long> {
    Optional<Statistics> findByUserId(Long userId);
}
