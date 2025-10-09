//package com.grouply.backend.chat_room;
//
//import com.grouply.backend.chat_room.dto.ChatRoomDTO;
//import com.grouply.backend.chat_room.dto.CreateChatRoomDTO;
//import com.grouply.backend.security.CustomUserDetails;
//import jakarta.validation.Valid;
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping("/api/chat-room")
//@RequiredArgsConstructor
//public class ChatRoomController {
//
//    private final ChatRoomService chatRoomService;
//
//
//    @PostMapping("/create")
//    public ChatRoomDTO createChatRoom(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestBody @Valid CreateChatRoomDTO dto) {
//        Long userId = userDetails.getId();
//        return chatRoomService.createChatRoom(userId, dto);
//    }
//
//}
