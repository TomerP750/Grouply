package com.grouply.backend.features.connection.connection_request.dto;

import com.grouply.backend.features.user.Dtos.UserDTO;
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
