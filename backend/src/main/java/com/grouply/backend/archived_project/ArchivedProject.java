package com.grouply.backend.archived_project;

import com.grouply.backend.project.Project;
import com.grouply.backend.project_post.ProjectPost;
import com.grouply.backend.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "archived_projects")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@EntityListeners(AuditingEntityListener.class)
public class ArchivedProject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private ProjectPost post;

    @ManyToOne
    private User user;

    @CreatedDate
    private LocalDateTime archivedAt;


}
