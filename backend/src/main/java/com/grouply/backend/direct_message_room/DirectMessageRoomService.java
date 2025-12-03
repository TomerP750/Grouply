package com.grouply.backend.direct_message_room;

import com.grouply.backend.direct_message_room.dto.DirectMessageRoomDTO;
import com.grouply.backend.user.User;
import com.grouply.backend.user.UserRepository;
import com.grouply.backend.util.EntityToDtoMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class DirectMessageRoomService {

    private final DirectMessageRoomRepository roomRepository;
    private final UserRepository userRepository;

    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalStateException("User not found: " + username));
    }

    @Transactional
    public DirectMessageRoomDTO getOrCreateRoom(Long recipientUserId) {

        System.out.println("recid: " + recipientUserId);

        User currentUser = getCurrentUser();
        System.err.println("current: " + currentUser);

        User recipientUser = userRepository.findById(recipientUserId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        System.err.println("rec: " + recipientUser);

        // canonical ordering by id so we don't create duplicate rooms
        User roomSender = currentUser.getId() < recipientUser.getId() ? currentUser : recipientUser;
        User roomRecipient = currentUser.getId() < recipientUser.getId() ? recipientUser : currentUser;

        DirectMessageRoom room = roomRepository.findBySenderAndRecipient(roomSender, roomRecipient)
                .orElseGet(() -> {
                    DirectMessageRoom r = DirectMessageRoom.builder()
                            .sender(roomSender)
                            .recipient(roomRecipient)
                            .build();
                    return roomRepository.save(r);
                });

        System.out.println("room: " + room);

        return toDto(room);
    }

    public DirectMessageRoomDTO getRoom(Long chatId) {
        return toDto(roomRepository.findById(chatId).orElseThrow(() -> new NoSuchElementException("User not found")));
    }

    @Transactional
    public List<DirectMessageRoomDTO> allRooms() {
        User me = getCurrentUser();
        List<DirectMessageRoom> rooms = roomRepository.findBySenderOrRecipient(me, me);
        return rooms.stream()
                .map(this::toDto)
                .toList();
    }

    private DirectMessageRoomDTO toDto(DirectMessageRoom room) {
        return DirectMessageRoomDTO.builder()
                .id(room.getId())
                .sender(EntityToDtoMapper.toUserDto(room.getSender()))
                .recipient(EntityToDtoMapper.toUserDto(room.getRecipient()))
                .createdAt(room.getCreatedAt())
                .build();
    }
}
