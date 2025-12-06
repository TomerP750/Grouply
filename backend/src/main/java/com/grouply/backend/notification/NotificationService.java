package com.grouply.backend.notification;

import com.grouply.backend.notification.dto.NotificationDTO;
import com.grouply.backend.user.User;
import com.grouply.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {

    private final UserRepository userRepository;

    public final String QUEUE_NOTIFICATIONS = "/queue/notifications";

    private final NotificationRepository notificationRepository;
    private final SimpMessagingTemplate messagingTemplate;


    // For broadcast notifications (all connected clients on /stream)
    private final List<SseEmitter> broadcastEmitters = new CopyOnWriteArrayList<>();

    // For per-user notifications (connected on /stream/{userId})
    private final Map<Long, SseEmitter> userEmitters = new ConcurrentHashMap<>();

    /** Subscribe to global/broadcast notifications */
    public SseEmitter subscribeToBroadcast() {
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);
        broadcastEmitters.add(emitter);

        emitter.onCompletion(() -> broadcastEmitters.remove(emitter));
        emitter.onTimeout(() -> broadcastEmitters.remove(emitter));
        emitter.onError(e -> {
            log.warn("Broadcast emitter error: {}", e.getMessage());
            broadcastEmitters.remove(emitter);
        });

        return emitter;
    }

    /** Subscribe a specific user to their private notification stream */
    public SseEmitter subscribeUser(Long userId) {
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);
        userEmitters.put(userId, emitter);

        emitter.onCompletion(() -> userEmitters.remove(userId));
        emitter.onTimeout(() -> userEmitters.remove(userId));
        emitter.onError(e -> {
            log.warn("User emitter error for user {}: {}", userId, e.getMessage());
            userEmitters.remove(userId);
        });
        System.err.println("I am subsribed");
        return emitter;
    }

    /** Send a broadcast notification to everyone listening on /stream */
    public void sendPublicNotification(String message) {
        List<SseEmitter> deadEmitters = new ArrayList<>();

        for (SseEmitter emitter : broadcastEmitters) {
            try {
                emitter.send(
                        SseEmitter.event()
                                .name("message")
                                .data(message)
                );
            } catch (IOException e) {
                log.warn("Removing dead broadcast emitter: {}", e.getMessage());
                deadEmitters.add(emitter);
            }
        }

        broadcastEmitters.removeAll(deadEmitters);
    }

    /** Send a notification to a specific user */
    public void sendNotification(NotificationDTO request) {

        Long receiverId = request.targetUserId();
        SseEmitter emitter = userEmitters.get(receiverId);

        if (emitter == null) {
            // user is not connected right now
            log.info("User {} is not connected; cannot send SSE notification", receiverId);
            // here could save the notification in DB for later delivery
            return;
        }

        try {
            emitter.send(
                    SseEmitter.event()
                            .name("message")
                            .data(request.message())
            );
        } catch (IOException e) {
            log.warn("Error sending notification to user {}: {}", receiverId, e.getMessage());
            userEmitters.remove(receiverId);
        }
    }

    private User fetchUser(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new NoSuchElementException("User not found"));
    }
}
