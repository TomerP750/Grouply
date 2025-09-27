package com.grouply.backend.finished_project;


import com.grouply.backend.project.Project;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Ive decided to separate the project as finished to prevent any mistake when displaying
 * finished projects. safety reasons
 */
@Entity
@Table(name = "finished_projects")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class FinishedProject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private Project project;

}
