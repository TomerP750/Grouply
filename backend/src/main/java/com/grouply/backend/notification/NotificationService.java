//package com.grouply.backend.notification;
//
//import com.grouply.backend.notification.dto.NotificationDTO;
//import com.grouply.backend.user.User;
//import com.grouply.backend.user.UserRepository;
//import com.grouply.backend.util.EntityToDtoMapper;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.messaging.simp.SimpMessagingTemplate;
//import org.springframework.stereotype.Service;
//
//import java.time.Instant;
//import java.util.NoSuchElementException;
//
//@Service
//@RequiredArgsConstructor
//@Slf4j
//public class NotificationService {
//
//    private final UserRepository userRepository;
//
//    public final String QUEUE_NOTIFICATIONS = "/queue/notifications";
//
//    private final SimpMessagingTemplate messagingTemplate;
//
//    public void notifyUser(Long userId, String destination, Object payload) {
//        messagingTemplate.convertAndSendToUser(userId.toString(), destination, payload);
//    }
//
//    public Notification build(NotificationType type, User recipient, User sender, String message) {
//
//        return Notification.builder()
//                .type(type)
//                .recipient(recipient)
//                .sender(sender)
//                .message(message)
//                .build();
//    }
//
//
//    public void sendUserNotification(Long recipientId, NotificationType type, Long senderId, String message) {
//        User recipient = fetchUser(recipientId);
//        User sender = fetchUser(senderId);
//
//        Notification notification = build(type, recipient, sender, message);
//
//        NotificationDTO dto = NotificationDTO.builder()
//                .type(notification.getType())
//                .recipient(EntityToDtoMapper.toUserDto(recipient))
//                .sender(EntityToDtoMapper.toUserDto(sender))
//                .message(notification.getMessage())
//                .createdAt(notification.getCreatedAt())
//                .build();
//
//        notifyUser(recipientId, QUEUE_NOTIFICATIONS, dto);
//    }
//
//
//    private User fetchUser(Long id) {
//        return userRepository.findById(id).orElseThrow(() -> new NoSuchElementException("User not found"));
//    }
//}
