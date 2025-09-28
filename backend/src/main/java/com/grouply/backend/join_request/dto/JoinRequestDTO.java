package com.grouply.backend.join_request.dto;

import com.grouply.backend.project_post_position.ProjectPostPosition;
import com.grouply.backend.project_post_position.dto.ProjectPostPositionDTO;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class JoinRequestDTO {

    Long senderId;
    ProjectPostPositionDTO postPositionDTO;
    Long projectPostId;

}
