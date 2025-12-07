package com.grouply.backend.direct_message_room;


import com.grouply.backend.chat_message.ChatMessage;
import com.grouply.backend.direct_message.DirectMessage;
import com.grouply.backend.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "direct_messages_rooms")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@EntityListeners(AuditingEntityListener.class)
public class DirectMessageRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private User sender;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private User recipient;

//    private ChatMessage lastMessage;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private Instant createdAt;

//    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY)
//    private List<DirectMessage> messages = new ArrayList<>();


}
