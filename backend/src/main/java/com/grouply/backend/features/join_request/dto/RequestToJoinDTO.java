package com.grouply.backend.features.join_request.dto;

public record RequestToJoinDTO(
        Long senderId,
        Long projectPostPositionId,
        Long postId
) {
}
