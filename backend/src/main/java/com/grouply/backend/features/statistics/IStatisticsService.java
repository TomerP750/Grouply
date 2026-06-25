package com.grouply.backend.features.statistics;

import com.grouply.backend.features.statistics.dto.StatisticsDTO;

public interface IStatisticsService {


    StatisticsDTO getStats(Long userId);

}
