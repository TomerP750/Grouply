package com.grouply.backend.chat_message.dto;

import lombok.Builder;
import lombok.Data;


@Builder
@Data
public class ChatMessageDTO {

    String content;
    String senderUsername;
    String avatarUrl;
    long sentAt;

}

