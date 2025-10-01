//package com.grouply.backend.chat_message;
//
//import com.grouply.backend.chat_message.dto.ChatMessageDTO;
//import com.grouply.backend.exceptions.InvalidInputException;
//import com.grouply.backend.user.User;
//import com.grouply.backend.user.UserRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//
//import java.time.LocalDateTime;
//import java.util.NoSuchElementException;
//
//@Service
//@RequiredArgsConstructor
//public class ChatMessageService {
//
//    private final UserRepository userRepository;
//
//    public ChatMessageDTO sendMessage(String username, String content) {
//
//        User user = fetchUser(username);
//        return ChatMessageDTO.builder()
//                .senderUsername(user.getUsername())
//                .avatarUrl(user.getAvatarUrl())
//                .content(content)
//                .sentAt(System.currentTimeMillis())
//                .build();
//    }
//
//
//
//    private User fetchUser(String username) {
//        return userRepository.findByUsername(username).orElseThrow(() -> new NoSuchElementException("Not found"));
//    }
//}
