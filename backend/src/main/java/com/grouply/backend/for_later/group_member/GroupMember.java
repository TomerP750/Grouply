//package com.grouply.backend.group_member;
//
//
//import com.grouply.backend.group.Group;
//import com.grouply.backend.user.User;
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//@Entity
//@Table
//@NoArgsConstructor
//@AllArgsConstructor
//@Data
//@Builder
//public class GroupMember {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @ManyToOne
//    private User user;
//
//    @Enumerated(EnumType.STRING)
//    @Column(nullable = false)
//    private GroupRole groupRole;
//
//    @ManyToOne
//    private Group group;
//}
