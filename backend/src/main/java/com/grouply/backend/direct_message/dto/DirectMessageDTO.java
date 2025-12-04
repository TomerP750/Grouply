package com.grouply.backend.direct_message.dto;

import com.grouply.backend.user.Dtos.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.Instant;

@Data
@AllArgsConstructor
@Builder
public class DirectMessageDTO {


    private Long id;
    private Long roomId;

    private UserDTO sender;

    private UserDTO recipient;

    private String message;
    private Instant sentAt;

}
