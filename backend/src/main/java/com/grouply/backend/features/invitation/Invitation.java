package com.grouply.backend.features.invitation;

import com.grouply.backend.features.project.project.Project;
import com.grouply.backend.features.project.project_member.ProjectMember;
import com.grouply.backend.features.project.project_member.ProjectPosition;
import com.grouply.backend.features.user.User;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "invitations")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class Invitation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private ProjectMember sender;

    @ManyToOne
    private User recipient;

    @Enumerated(EnumType.STRING)
    private InvitationStatus status;

    @Enumerated(EnumType.STRING)
    private ProjectPosition position;

    @ManyToOne
    private Project project;

    @CreatedDate
    private LocalDateTime sentAt;

}
