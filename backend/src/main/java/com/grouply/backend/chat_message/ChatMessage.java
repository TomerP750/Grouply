//package com.grouply.backend.chat_message;
//
//import com.grouply.backend.chat_member.ChatMember;
//import com.grouply.backend.chat_room.ChatRoom;
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//import org.springframework.data.jpa.domain.support.AuditingEntityListener;
//
//import java.time.Instant;
//import java.time.LocalDateTime;
//
//@Entity
//@Table(name = "chat_messages")
//@NoArgsConstructor
//@AllArgsConstructor
//@Data
//@Builder
//@EntityListeners(AuditingEntityListener.class)
//public class ChatMessage {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @Column(nullable = false, length = 500)
//    private String content;
//
//    @ManyToOne(optional = false, fetch = FetchType.LAZY)
//    private ChatMember member;
//
//    @ManyToOne(optional = false, fetch = FetchType.LAZY)
//    private ChatRoom chatRoom;
//
//    @Enumerated(EnumType.STRING)
//    private ChatMessageStatus status;
//
//    private Instant sentAt;
//}
