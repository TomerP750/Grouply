package com.grouply.backend.join_request.dto;

public record RequestToJoinDTO(
        Long senderId,
        Long projectPostPositionId,
        Long postId
) {
}
