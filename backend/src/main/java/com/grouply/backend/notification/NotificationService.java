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
    private final Map<Long, List<SseEmitter>> userEmitters = new ConcurrentHashMap<>();


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

        userEmitters
                .computeIfAbsent(userId, id -> new CopyOnWriteArrayList<>())
                .add(emitter);

        emitter.onCompletion(() -> {
            List<SseEmitter> emitters = userEmitters.get(userId);
            if (emitters != null) {
                emitters.remove(emitter);
                if (emitters.isEmpty()) {
                    userEmitters.remove(userId);
                }
            }
        });

        emitter.onTimeout(() -> {
            List<SseEmitter> emitters = userEmitters.get(userId);
            if (emitters != null) {
                emitters.remove(emitter);
                if (emitters.isEmpty()) {
                    userEmitters.remove(userId);
                }
            }
        });

        emitter.onError(e -> {
            log.warn("User emitter error for user {}: {}", userId, e.getMessage());
            List<SseEmitter> emitters = userEmitters.get(userId);
            if (emitters != null) {
                emitters.remove(emitter);
                if (emitters.isEmpty()) {
                    userEmitters.remove(userId);
                }
            }
        });

        log.info("User subscribed");
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
    public void sendConnectionNotification(NotificationDTO request) {

        Long receiverId = request.targetUserId();
        List<SseEmitter> emitters = userEmitters.get(receiverId);

        if (emitters == null || emitters.isEmpty()) {
            log.info("User {} is not connected; cannot send SSE notification", receiverId);
            return;
        }

        List<SseEmitter> deadEmitters = new ArrayList<>();

        for (SseEmitter emitter : emitters) {
            try {
                emitter.send(
                        SseEmitter.event()
                                .name("connection-badge")
                                .data(request.message())
                );
            } catch (IOException e) {
                log.warn("Error sending connection notification to user {}: {}", receiverId, e.getMessage());
                emitter.completeWithError(e);
                deadEmitters.add(emitter);
            }
        }

        emitters.removeAll(deadEmitters);
        if (emitters.isEmpty()) {
            userEmitters.remove(receiverId);
        }
    }


    //TODO change based on notificationType the message
    public void sendNotificationBadge(NotificationDTO dto) {

        Long receiverId = dto.targetUserId();
        List<SseEmitter> emitters = userEmitters.get(receiverId);

        if (emitters == null || emitters.isEmpty()) {
            log.info("User {} is not connected; cannot send notification badge", receiverId);
            return;
        }

        List<SseEmitter> deadEmitters = new ArrayList<>();

        for (SseEmitter emitter : emitters) {
            try {
                emitter.send(
                        SseEmitter.event()
                                .name("notification-badge")
                                .data(dto)
                );
            } catch (IOException e) {
                log.warn("Error sending notification badge to user {}: {}", receiverId, e.getMessage());
                emitter.completeWithError(e);
                deadEmitters.add(emitter);
            }
        }

        emitters.removeAll(deadEmitters);
        if (emitters.isEmpty()) {
            userEmitters.remove(receiverId);
        }
    }


    public NotificationDTO buildNotification(
            NotificationType type,
            Long targetUserId,
            String actorUsername,
            String actorAvatarUrl,
            String context
    ) {
        String message = switch (type) {
            case CONNECTION_REQUEST ->
                    actorUsername + " sent you a connection request";

            case ACCEPTED_CONNECTION ->
                    actorUsername + " accepted your connection request";

            case APPLIED_TO_POST ->
                    actorUsername + " applied to your post" +
                            (context != null && !context.isBlank() ? " \"" + context + "\"" : "");
        };

        return new NotificationDTO(
                type,
                targetUserId,
                actorUsername,
                actorAvatarUrl,
                message
        );
    }



    private User fetchUser(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new NoSuchElementException("User not found"));
    }
}
