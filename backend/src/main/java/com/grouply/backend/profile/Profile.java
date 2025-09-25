package com.grouply.backend.profile;

import com.grouply.backend.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "profiles")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String about;
    private String bannerUrl;

    //TODO add project participant in

    @OneToOne
    private User user;

}
