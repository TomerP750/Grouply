package com.grouply.backend.project_post.dto;

import com.grouply.backend.join_request.RequestStatus;
import com.grouply.backend.project_post.ProjectPost;
import com.grouply.backend.user.User;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Data
public class RequestToJoinDTO {

    private Long id;

    private ProjectPost post;

    private RequestStatus status;


    private User user;

    private LocalDateTime requestedAt;


}
