package com.grouply.backend.activity.dto;

import com.grouply.backend.activity.ActivityType;
import com.grouply.backend.user.Dtos.UserDTO;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ActivityDTO {

    private Long id;
    private String message;
    private String navigateLink;
    private ActivityType activityType;
    private UserDTO user;
    private LocalDateTime createdAt;
}
