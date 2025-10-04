package com.grouply.backend.post.dto;

import com.grouply.backend.join_request.RequestStatus;
import com.grouply.backend.post.Post;
import com.grouply.backend.user.User;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class RequestToJoinDTO {

    private Long id;

    private Post post;

    private RequestStatus status;


    private User user;

    private LocalDateTime requestedAt;


}
