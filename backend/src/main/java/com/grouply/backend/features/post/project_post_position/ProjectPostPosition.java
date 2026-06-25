package com.grouply.backend.features.post.project_post_position;

import com.grouply.backend.features.post.post.Post;
import com.grouply.backend.features.project.project_member.ProjectPosition;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import jakarta.persistence.*;


@Entity
@Table(name = "projects_posts_positions")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@EntityListeners(AuditingEntityListener.class)
public class ProjectPostPosition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Post post;

    @Enumerated(EnumType.STRING)
    private ProjectPosition position;


}
