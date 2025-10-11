package com.grouply.backend.technology.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TechnologyDTO {

    private Long id;
    private String name;
    private String slug;
    private String color;

}
