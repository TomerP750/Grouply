package com.grouply.backend.statistics;

import com.grouply.backend.statistics.dto.StatisticsDTO;

public interface IStatisticsService {


    StatisticsDTO getStats(Long userId);

}
