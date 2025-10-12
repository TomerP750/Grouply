package com.grouply.backend.technology;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "technologies")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Technology {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false, unique = true, length = 64)
    private String slug; // this will help me for fetch api/get/react for example

    @Column(length = 7)
    private String color;


}
