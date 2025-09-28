package com.grouply.backend.profile.dto;

import lombok.Data;

@Data
public class UpdateProfileDTO {

    private Long userId;
    private String about;
    private String banner;

}
