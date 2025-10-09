package com.grouply.backend.chat_message;

import com.grouply.backend.chat_member.ChatMember;
import com.grouply.backend.chat_member.ChatMemberRepository;
import com.grouply.backend.chat_message.dto.ChatMessageDTO;
import com.grouply.backend.chat_room.ChatRoom;
import com.grouply.backend.chat_room.ChatRoomRepository;
import com.grouply.backend.exceptions.InvalidInputException;
import com.grouply.backend.user.User;
import com.grouply.backend.user.UserRepository;
import com.grouply.backend.util.EntityToDtoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class ChatMessageService {

    private final UserRepository userRepository;
    private final ChatMemberRepository chatMemberRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final SimpMessagingTemplate template;

    @Transactional
    public void sendMessage(ChatMessageDTO dto) {

        ChatRoom chatRoom = chatRoomRepository.findById(dto.getChatRoomId())
                .orElseThrow(() -> new NoSuchElementException("Chat room not found"));

        ChatMember sender = chatMemberRepository.findById(dto.getSender().getId())
                .orElseThrow(() -> new NoSuchElementException("Sender not found"));

        ChatMessage message = ChatMessage.builder()
                .content(dto.getContent())
                .status(ChatMessageStatus.DELIVERED)
                .sentAt(Instant.now())
                .chatRoom(chatRoom)
                .member(sender)
                .build();

        ChatMessage saved = chatMessageRepository.save(message);

        ChatMessageDTO out = EntityToDtoMapper.toChatMessageDto(saved);

        template.convertAndSend("/topic/rooms/"+ saved.getChatRoom().getId(), out);


    }



    private User fetchUser(String username) {
        return userRepository.findByUsername(username).orElseThrow(() -> new NoSuchElementException("Not found"));
    }
}
