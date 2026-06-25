package com.grouply.backend.features.join_request.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class JoinRequestDTO {

    Long id;
    Long senderId;
    String senderUsername;
    Long projectPostPositionId;
    Long projectPostId;
    LocalDateTime requestedAt;

}
