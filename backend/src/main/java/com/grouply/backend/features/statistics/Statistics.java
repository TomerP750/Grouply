package com.grouply.backend.features.statistics;

import com.grouply.backend.features.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Statistics {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer completedProjects;
    private Integer activeProjects;

    private Integer connections;

    @OneToOne
    private User user;

}
