package com.grouply.backend.chat_room.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data
public class CreateChatRoomDTO {

    @NotBlank
    @Length(min = 10, max = 50)
    private String name;
    @NotBlank
    private Long projectId;

}
