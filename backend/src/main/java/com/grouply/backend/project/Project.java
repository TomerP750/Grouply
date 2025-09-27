package com.grouply.backend.project;


import com.grouply.backend.project_member.ProjectMember;
import com.grouply.backend.technology.Technology;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "projects")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@EntityListeners(AuditingEntityListener.class)
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

//    @ManyToOne
//    private Group group;

    @OneToMany(mappedBy = "project")
    private Set<ProjectMember> projectMembers;

    @CreatedDate
    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    private ProjectStatus status;

    @ManyToMany(mappedBy = "project")
    private Set<Technology> technologies = new HashSet<>();


    


}
