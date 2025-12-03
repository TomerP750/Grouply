package com.grouply.backend.direct_message;

import com.grouply.backend.direct_message.dto.CreateDMRequest;
import com.grouply.backend.direct_message.dto.DirectMessageDTO;
import com.grouply.backend.direct_message_room.DirectMessageRoom;
import com.grouply.backend.direct_message_room.DirectMessageRoomRepository;
import com.grouply.backend.direct_message_room.dto.DirectMessageRoomDTO;
import com.grouply.backend.user.User;
import com.grouply.backend.user.UserRepository;
import com.grouply.backend.util.EntityToDtoMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DirectMessageService {

    private final DirectMessageRoomRepository roomRepository;
    private final DirectMessageRepository messageRepository;
    private final UserRepository userRepository;

    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalStateException("User not found: " + username));
    }

    @Transactional
    public DirectMessageRoomDTO getOrCreateRoom(Long recipientUserId) {

        User senderUser = getCurrentUser();
        User recipientUser = userRepository.findById(recipientUserId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // canonical ordering by id so we don't create duplicate rooms
        User roomSender = senderUser.getId() < recipientUser.getId() ? senderUser : recipientUser;
        User roomRecipient = senderUser.getId() < recipientUser.getId() ? recipientUser : senderUser;

        DirectMessageRoom room = roomRepository.findBySenderAndRecipient(roomSender, roomRecipient)
                .orElseGet(() -> {
                    DirectMessageRoom r = DirectMessageRoom.builder()
                            .sender(roomSender)
                            .recipient(roomRecipient)
                            .createdAt(Instant.now())
                            .build();
                    return roomRepository.save(r);
                });

        return toRoomDto(room, senderUser);
    }

    @Transactional
    public List<DirectMessageRoomDTO> listMyRooms() {
        User me = getCurrentUser();
        List<DirectMessageRoom> rooms = roomRepository.findBySenderOrRecipient(me, me);

        return rooms.stream()
                .map(room -> toRoomDto(room, me))
                .toList();
    }

    @Transactional
    public Page<DirectMessageDTO> listMessages(Long roomId, int page, int size) {

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
    public DirectMessageDTO sendMessage(Long roomId, CreateDMRequest req) {

        User senderUser = getCurrentUser();
        DirectMessageRoom room = roomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("Room not found"));

        // ensure current user is part of this room
        boolean isSender = room.getSender().getId().equals(senderUser.getId());
        boolean isRecipient = room.getRecipient().getId().equals(senderUser.getId());

        if (!isSender && !isRecipient) {
            throw new SecurityException("Forbidden");
        }

        // decide recipient of this message based on current sender
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

        return toMessageDto(saved);
    }

    // ===== mapping helpers =====

    private DirectMessageRoomDTO toRoomDto(DirectMessageRoom room, User currentUser) {
        // In the DTO, "sender" and "recipient" are the canonical ones from the room.
        return DirectMessageRoomDTO.builder()
                .id(room.getId())
                .sender(EntityToDtoMapper.toUserDto(room.getSender()))
                .recipient(EntityToDtoMapper.toUserDto(room.getRecipient()))
                .build();
    }

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
