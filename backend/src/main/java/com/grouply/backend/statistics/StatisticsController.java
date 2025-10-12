package com.grouply.backend.statistics;

import com.grouply.backend.security.CustomUserDetails;
import com.grouply.backend.statistics.dto.StatisticsDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/stats")
@RequiredArgsConstructor
public class StatisticsController {


    private final StatisticsService statisticsService;


    @GetMapping("/get")
    public StatisticsDTO userStats(@AuthenticationPrincipal CustomUserDetails userDetails) {
        Long userId = userDetails.getId();
        return statisticsService.getStats(userId);
    }

}
