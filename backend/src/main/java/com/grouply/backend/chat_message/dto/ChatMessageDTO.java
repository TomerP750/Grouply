package com.grouply.backend.chat_message.dto;

import com.grouply.backend.chat_member.dto.ChatMemberDTO;
import com.grouply.backend.chat_message.ChatMessageStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatMessageDTO {
    private Long id;
    private String content;
    private ChatMessageStatus status;
    private Instant sentAt;
    private ChatMemberDTO sender;
    private Long chatRoomId;
}
