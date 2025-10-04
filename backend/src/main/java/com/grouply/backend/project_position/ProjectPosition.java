//package com.grouply.backend.project_position;
//
//import com.grouply.backend.department.Department;
//import com.grouply.backend.project.Project;
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//@Entity
//@Table(name = "project_positions")
//@NoArgsConstructor
//@AllArgsConstructor
//@Data
//@Builder
//public class ProjectPosition {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    private String name; // backend
//
//
//
//    @ManyToOne
//    private Department department; // development
//
//}
