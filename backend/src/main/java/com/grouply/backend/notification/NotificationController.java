package com.grouply.backend.notification;

import com.grouply.backend.notification.dto.NotificationDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

//    Notification for group of people
    /** Global stream for all users */
    @GetMapping("/stream")
    public SseEmitter streamNotifications() {
        return notificationService.subscribeToBroadcast();
    }

    /** Send a broadcast/public notification */
    @PostMapping("/send/public")
    public void sendPublicNotification(@RequestBody String message) {
        notificationService.sendPublicNotification(message);
    }

//    Notification For 1 to 1
    /** Stream for a specific user */
    @GetMapping("/stream/{userId}")
    public SseEmitter streamUserNotifications(@PathVariable Long userId) {
        return notificationService.subscribeUser(userId);
    }


    /** Send a notification to a specific user */
    @PostMapping("/send")
    public void sendNotification(@RequestBody NotificationDTO request) {
        notificationService.sendNotification(request);
    }


}
