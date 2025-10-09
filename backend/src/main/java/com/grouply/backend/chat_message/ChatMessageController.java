//package com.grouply.backend.chat_message;
//
//import com.grouply.backend.chat_message.dto.ChatMessageDTO;
//import com.grouply.backend.security.CustomUserDetails;
//import com.grouply.backend.user.User;
//import com.grouply.backend.user.UserService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.messaging.handler.annotation.MessageMapping;
//import org.springframework.messaging.handler.annotation.Payload;
//import org.springframework.messaging.handler.annotation.SendTo;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.security.Principal;
//
//@RestController
//@RequiredArgsConstructor
//public class ChatMessageController {
//
//    private final ChatMessageService chatMessageService;
//    private final UserService userService;
//
//
//    @MessageMapping("/sendMessage")
//    public void sendMessage(@Payload ChatMessageDTO content) {
//        chatMessageService.sendMessage(content);
//    }
//
//}
