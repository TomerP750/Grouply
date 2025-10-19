//package com.grouply.backend.recruiter;
//
//import com.grouply.backend.user.Account;
//import com.grouply.backend.user.User;
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//@Entity
//@Table(name = "recruiters")
//@NoArgsConstructor
//@AllArgsConstructor
//@Data
//@Builder
//public class Recruiter {
//
//    @Id
//    private Long id;
//
//    @OneToOne
//    @MapsId
//    private User user;
//
//    private String companyName;
//    private String companyEmail;
//
//
//}
