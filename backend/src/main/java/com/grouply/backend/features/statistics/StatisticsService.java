package com.grouply.backend.features.statistics;

import com.grouply.backend.features.statistics.dto.StatisticsDTO;
import com.grouply.backend.features.user.User;
import com.grouply.backend.features.user.UserRepository;
import com.grouply.backend.shared.util.EntityToDtoMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Slf4j
public class StatisticsService implements IStatisticsService {

    private final StatisticsRepository statisticsRepository;
    private final UserRepository userRepository;


    @Override
    public StatisticsDTO getStats(Long userId) {

        Statistics stats = statisticsRepository.findByUserId(userId).orElseThrow(() -> new NoSuchElementException("Stats not found"));
        return StatisticsDTO.builder()
                .activeProjects(stats.getActiveProjects())
                .completedProjects(stats.getCompletedProjects())
                .connections(stats.getConnections())
                .user(EntityToDtoMapper.toUserDto(stats.getUser()))
                .build();
    }


}
