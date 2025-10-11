package com.grouply.backend.project;


import com.grouply.backend.project_member.ProjectMember;
//import com.grouply.backend.technology.Technology;
import com.grouply.backend.technology.Technology;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.NoSuchElementException;
import java.util.Set;

@Entity
@Table(name = "projects")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@EntityListeners(AuditingEntityListener.class)
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ProjectMember> projectMembers = new HashSet<>();

    @CreatedDate
    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    private ProjectStatus status;

    @ManyToMany
    private Set<Technology> technologies = new HashSet<>();

    public void addMember(ProjectMember member) {
        projectMembers.add(member);
        member.setProject(this);
    }
}
