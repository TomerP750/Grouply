package com.grouply.backend.project_post_position;

import com.grouply.backend.project_member.ProjectPosition;
import com.grouply.backend.project_post.ProjectPost;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import jakarta.persistence.*;

import java.util.List;


@Entity
@Table(name = "projects_posts_positions")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@EntityListeners(AuditingEntityListener.class)
public class ProjectPostPosition {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private ProjectPost projectPost;

    @Enumerated(EnumType.STRING)
    private ProjectPosition position;


    //TODO maybe add note


}
