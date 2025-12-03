package com.grouply.backend.direct_message_room.dto;

import com.grouply.backend.user.Dtos.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DirectMessageRoomDTO {

    private Long id;
    private UserDTO sender;
    private UserDTO recipient;
    private Instant createdAt;
}
