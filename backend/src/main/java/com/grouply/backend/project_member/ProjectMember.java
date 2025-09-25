package com.grouply.backend.project_member;

import com.grouply.backend.group_member.GroupMember;
import com.grouply.backend.project.Project;
import com.grouply.backend.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ProjectMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private GroupMember user;

    @Enumerated(EnumType.STRING)
    private ProjectRole projectRole;

    @ManyToOne
    private Project project;
}
