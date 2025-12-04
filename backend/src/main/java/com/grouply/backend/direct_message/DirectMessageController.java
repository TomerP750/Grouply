package com.grouply.backend.direct_message;

import com.grouply.backend.direct_message.dto.SendDmDTO;
import com.grouply.backend.direct_message.dto.DirectMessageDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dm")
@RequiredArgsConstructor
public class DirectMessageController {

    private final DirectMessageService directMessageService;


    @GetMapping("/{roomId}/messages")
    public Page<DirectMessageDTO> roomMessages(
            @PathVariable Long roomId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size
    ) {
        return directMessageService.roomMessages(roomId, page, size);
    }

    @PostMapping("/{roomId}/send")
    public DirectMessageDTO sendMessage(@PathVariable Long roomId, @RequestBody SendDmDTO request) {
        return directMessageService.sendMessage(roomId, request);
    }


    @MessageMapping("/ws/{roomId}/send")
    public void sendOverWs(@DestinationVariable Long roomId, SendDmDTO req) {
        directMessageService.sendMessage(roomId, req);
    }
}
