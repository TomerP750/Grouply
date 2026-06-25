package com.grouply.backend.features.statistics.dto;

import com.grouply.backend.features.user.Dtos.UserDTO;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class StatisticsDTO {

    private Integer completedProjects;
    private Integer activeProjects;
    private Integer connections;

    private UserDTO user;

}
