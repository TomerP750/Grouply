package com.grouply.backend.project_member;

import com.grouply.backend.project.Project;
import com.grouply.backend.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@EntityListeners(AuditingEntityListener.class)
public class ProjectMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @Enumerated(EnumType.STRING)
    private ProjectPosition projectPosition; // backend / frontend etc..

    @Enumerated(EnumType.STRING)
    private ProjectRole projectRole; // user / owner etc..

    @ManyToOne
    private Project project;


}
