package com.grouply.backend.project_post;

import com.grouply.backend.join_request.JoinRequest;
import com.grouply.backend.project.Project;
import com.grouply.backend.project_post_position.ProjectPostPosition;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "projects_posts")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@EntityListeners(AuditingEntityListener.class)
public class ProjectPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String description;

    @OneToMany(mappedBy = "projectPost")
    private List<ProjectPostPosition> positions;

    @ManyToOne
    private Project project;

    @CreatedDate
    private LocalDateTime postedAt;
}
