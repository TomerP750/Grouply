package com.grouply.backend.notification.dto;

import com.grouply.backend.notification.NotificationType;
import com.grouply.backend.user.Dtos.UserDTO;
import lombok.Builder;
import lombok.Data;


import java.time.Instant;

@Data
@Builder
public class NotificationDTO {

    private NotificationType type;

    private UserDTO recipient;

    private UserDTO sender;

    private String message;

    private Instant createdAt;

}
