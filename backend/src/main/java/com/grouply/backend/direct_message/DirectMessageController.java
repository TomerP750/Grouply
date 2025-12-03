package com.grouply.backend.direct_message;

import com.grouply.backend.direct_message.dto.CreateDMRequest;
import com.grouply.backend.direct_message.dto.DirectMessageDTO;
import com.grouply.backend.direct_message_room.dto.DirectMessageRoomDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dm")
@RequiredArgsConstructor
public class DirectMessageController {

    private final DirectMessageService directMessageService;

    @GetMapping("/rooms")
    public List<DirectMessageRoomDTO> listRooms() {
        return directMessageService.listMyRooms();
    }

    @GetMapping("/rooms/{roomId}/messages")
    public Page<DirectMessageDTO> listMessages(
            @PathVariable Long roomId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size
    ) {
        return directMessageService.listMessages(roomId, page, size);
    }

    @PostMapping("/rooms/{roomId}/messages")
    public DirectMessageDTO sendMessage(@PathVariable Long roomId, @RequestBody CreateDMRequest request) {
        return directMessageService.sendMessage(roomId, request);
    }

}
