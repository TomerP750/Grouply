package com.grouply.backend.notification.dto;


import com.grouply.backend.notification.NotificationType;

import java.time.Instant;


public record NotificationDTO (
        Long targetUserId,
        String message
) {}

