package com.grouply.backend.invitation;

import com.grouply.backend.project.Project;
import com.grouply.backend.project_member.ProjectMember;
import com.grouply.backend.project_member.ProjectPosition;
import com.grouply.backend.project_member.ProjectRole;
import com.grouply.backend.user.User;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

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

}
