package com.grouply.backend.direct_message_room;

import com.grouply.backend.direct_message.dto.SendDmDTO;
import com.grouply.backend.direct_message_room.dto.DirectMessageRoomDTO;
import com.grouply.backend.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dm/rooms")
@RequiredArgsConstructor
public class DirectMessageRoomController {

    private final DirectMessageRoomService directMessageRoomService;

    @GetMapping("/all")
    public List<DirectMessageRoomDTO> listRooms(@AuthenticationPrincipal CustomUserDetails userDetails) {
        Long userId = userDetails.getId();
        return directMessageRoomService.allRooms(userId);
    }

    @GetMapping("/{chatId}")
    public DirectMessageRoomDTO getRoom(@PathVariable Long chatId) {
        return directMessageRoomService.getRoom(chatId);
    }


    @PostMapping("/{recipientUserId}")
    public DirectMessageRoomDTO getOrCreateRoom(@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable Long recipientUserId) {
        Long userId = userDetails.getId();
        return directMessageRoomService.getOrCreateRoom(userId ,recipientUserId);
    }



}
