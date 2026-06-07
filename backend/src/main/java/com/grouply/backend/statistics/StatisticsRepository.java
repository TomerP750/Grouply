package com.grouply.backend.statistics;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface StatisticsRepository extends JpaRepository<Statistics, Long> {
    Optional<Statistics> findByUserId(Long userId);

    @Modifying
    @Query("UPDATE Statistics s SET s.connections = s.connections + 1 WHERE s.user.id = :userId")
    void incrementConnections(@Param("userId") Long userId);

    @Modifying
    @Query("UPDATE Statistics s SET s.activeProjects = s.activeProjects + 1 WHERE s.user.id = :userId")
    void incrementActiveProjects(Long userId);

    @Modifying
    @Query("UPDATE Statistics s SET s.activeProjects = s.activeProjects - 1 WHERE s.user.id = :userId")
    void decrementActiveProjects(Long userId);
}
