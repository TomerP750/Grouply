package com.grouply.backend.connection_request.dto;

import com.grouply.backend.connection_request.ConnectionRequestStatus;
import com.grouply.backend.user.Dtos.UserDTO;
import com.grouply.backend.user.User;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ConnectionRequestDTO {

    private Long id;

    private UserDTO sender;

    private UserDTO recipient;

    private LocalDateTime sentAt;

}
