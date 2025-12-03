package com.grouply.backend.direct_message.dto;

import com.grouply.backend.user.Dtos.UserDTO;
import lombok.Builder;

import java.time.Instant;

@Builder
public class DirectMessageDTO {


    private Long id;
    private Long roomId;

    private UserDTO sender;

    private UserDTO recipient;

    private String message;
    private Instant sentAt;

}
