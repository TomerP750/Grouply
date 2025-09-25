package com.grouply.backend.group_recruit;

import com.grouply.backend.group.Group;
import com.grouply.backend.group_member.GroupRole;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.List;

@Entity
@Table(name = "group_recruits")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@EntityListeners(AuditingEntityListener.class)
public class GroupRecruit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;

    private Integer spotsLeft;

    @ManyToOne
    @Enumerated(EnumType.STRING)
    private List<GroupRole> groupRoles;

    //TODO maybe onetoone
    @ManyToOne
    private Group group;

}
