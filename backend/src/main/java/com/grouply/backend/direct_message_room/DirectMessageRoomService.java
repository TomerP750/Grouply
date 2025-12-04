package com.grouply.backend.direct_message_room;

import com.grouply.backend.direct_message_room.dto.DirectMessageRoomDTO;
import com.grouply.backend.user.User;
import com.grouply.backend.user.UserRepository;
import com.grouply.backend.util.EntityToDtoMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Slf4j
public class DirectMessageRoomService {

    private final DirectMessageRoomRepository roomRepository;
    private final UserRepository userRepository;




    /**
     *
     * @param recipientUserId
     * @return
     */

    @Transactional
    public DirectMessageRoomDTO getOrCreateRoom(Long userId ,Long recipientUserId) {

        log.info("Entering get or create room");

        User currentUser = fetchUser(userId);

        User recipientUser = userRepository.findById(recipientUserId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

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

        log.info("Success fetch room");

        return toDto(room);
    }

    public DirectMessageRoomDTO getRoom(Long chatId) {
        return toDto(roomRepository.findById(chatId).orElseThrow(() -> new NoSuchElementException("User not found")));
    }

    @Transactional
    public List<DirectMessageRoomDTO> allRooms(Long userId) {
        User me = fetchUser(userId);
        List<DirectMessageRoom> rooms = roomRepository.findBySenderOrRecipient(me, me);
        return rooms.stream()
                .map(this::toDto)
                .toList();
    }

//    Utils Methods

    private User fetchUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException("User not found"));
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
