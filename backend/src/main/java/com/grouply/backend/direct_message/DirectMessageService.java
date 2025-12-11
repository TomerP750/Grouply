package com.grouply.backend.direct_message;

import com.grouply.backend.direct_message.dto.SendDmDTO;
import com.grouply.backend.direct_message.dto.DirectMessageDTO;
import com.grouply.backend.direct_message_room.DirectMessageRoom;
import com.grouply.backend.direct_message_room.DirectMessageRoomRepository;
import com.grouply.backend.user.User;
import com.grouply.backend.user.UserRepository;
import com.grouply.backend.util.EntityToDtoMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class DirectMessageService {

    private final DirectMessageRoomRepository roomRepository;
    private final DirectMessageRepository messageRepository;
    private final UserRepository userRepository;
    private final SimpMessagingTemplate messagingTemplate;

    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalStateException("User not found: " + username));
    }


    @Transactional
    public Page<DirectMessageDTO> roomMessages(Long roomId, int page, int size) {

        User me = getCurrentUser();
        DirectMessageRoom room = roomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("Room not found"));

        // user must be sender or recipient in this room
        boolean isSender = room.getSender().getId().equals(me.getId());
        boolean isRecipient = room.getRecipient().getId().equals(me.getId());

        if (!isSender && !isRecipient) {
            throw new SecurityException("Forbidden");
        }

        Page<DirectMessage> messages = messageRepository.findByRoomIdOrderBySentAtAsc(
                roomId, PageRequest.of(page, size)
        );

        return messages.map(this::toMessageDto);
    }

    @Transactional
    public DirectMessageDTO sendMessage(Long roomId, SendDmDTO req) {

        User senderUser = getCurrentUser();

        DirectMessageRoom room = roomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("Room not found"));


        boolean isSender = room.getSender().getId().equals(senderUser.getId());
        boolean isRecipient = room.getRecipient().getId().equals(senderUser.getId());

        if (!isSender && !isRecipient) {
            throw new SecurityException("Forbidden");
        }

        User recipientUser = room.getSender().getId().equals(senderUser.getId())
                ? room.getRecipient()
                : room.getSender();

        DirectMessage message = DirectMessage.builder()
                .room(room)
                .sender(senderUser)
                .recipient(recipientUser)
                .message(req.getMessage())
                .sentAt(Instant.now())
                .build();

        DirectMessage saved = messageRepository.save(message);

        DirectMessageDTO dto = toMessageDto(saved);

        messagingTemplate.convertAndSend("/topic/dm/" + roomId, dto);

        return dto;
    }

    // ===== mapping helpers =====

    private DirectMessageDTO toMessageDto(DirectMessage dm) {
        return DirectMessageDTO.builder()
                .id(dm.getId())
                .roomId(dm.getRoom().getId())
                .sender(EntityToDtoMapper.toUserDto(dm.getSender()))
                .recipient(EntityToDtoMapper.toUserDto(dm.getRecipient()))
                .message(dm.getMessage())
                .sentAt(dm.getSentAt())
                .build();
    }
}
