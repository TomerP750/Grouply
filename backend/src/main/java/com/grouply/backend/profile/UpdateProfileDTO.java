package com.grouply.backend.profile;

import lombok.Data;

@Data
public class UpdateProfileDTO {

    private Long userId;
    private String about;
    private String banner;

}
