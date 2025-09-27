//package com.grouply.backend.technology;
//
//import com.grouply.backend.project.Project;
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//@Entity
//@Table(name = "technologies")
//@NoArgsConstructor
//@AllArgsConstructor
//@Data
//@Builder
//public class Technology {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//    @Column(nullable = false, unique = true)
//    private String name;
//
//    @ManyToMany(mappedBy = "technologies")
//    private Project project;
//
//}
