package com.grouply.backend.profile;

import com.grouply.backend.position.Position;
import com.grouply.backend.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

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

    @ManyToMany
    private List<Position> positions = new ArrayList<>();

    //TODO add project participant in

    @OneToOne
    private User user;

}
