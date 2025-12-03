package com.grouply.backend.direct_message_room;

import com.grouply.backend.direct_message_room.dto.DirectMessageRoomDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dm/rooms")
@RequiredArgsConstructor
public class DirectMessageRoomController {

    private final DirectMessageRoomService directMessageRoomService;
//
    @GetMapping("/all")
    public List<DirectMessageRoomDTO> listRooms() {
        return directMessageRoomService.allRooms();
    }

    @GetMapping("/{chatId}")
    public DirectMessageRoomDTO getRoom(@PathVariable Long chatId) {
        return directMessageRoomService.getRoom(chatId);
    }


    @PostMapping("/{recipientUserId}")
    public DirectMessageRoomDTO getOrCreateRoom(@PathVariable Long recipientUserId) {
        System.out.println("cont: " + recipientUserId);
        return directMessageRoomService.getOrCreateRoom(recipientUserId);
    }
}
