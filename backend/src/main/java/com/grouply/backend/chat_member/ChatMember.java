package com.grouply.backend.chat_member;

import com.grouply.backend.chat_room.ChatRoom;
import com.grouply.backend.project_member.ProjectMember;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "chat_members")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ChatMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private ProjectMember member;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private ChatRoom chatRoom;

}
