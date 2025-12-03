package com.grouply.backend.chat_room.dto;

import com.grouply.backend.chat_member.dto.ChatMemberDTO;
import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoomDTO {
    private Long id;
    private String name;
    private Long projectId;
    private List<ChatMemberDTO> members;
}
