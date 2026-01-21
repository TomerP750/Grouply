package com.grouply.backend.statistics;

import com.grouply.backend.statistics.dto.StatisticsDTO;
import com.grouply.backend.user.User;
import com.grouply.backend.user.UserRepository;
import com.grouply.backend.util.EntityToDtoMapper;
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


    //Helpers
    private User fetchUser(Long userId) {
        return userRepository.findById(userId).orElseThrow(()->new NoSuchElementException("User not found"));
    }

}
