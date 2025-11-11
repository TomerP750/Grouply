package com.grouply.backend.join_request.dto;

import com.grouply.backend.project_post_position.dto.ProjectPostPositionDTO;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class JoinRequestDTO {

    Long id;
    Long senderId;
    Long projectPostPositionId;
    Long projectPostId;
    LocalDateTime requestedAt;

}
