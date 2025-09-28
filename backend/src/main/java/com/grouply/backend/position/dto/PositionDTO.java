package com.grouply.backend.position.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PositionDTO {

    private Long id;
    private String name;

}
