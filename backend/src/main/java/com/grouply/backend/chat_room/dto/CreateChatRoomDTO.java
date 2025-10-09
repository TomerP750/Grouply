package com.grouply.backend.chat_room.dto;

import lombok.Data;

@Data
public class CreateChatRoomDTO {

    private String name;
    private Long projectId;

}
