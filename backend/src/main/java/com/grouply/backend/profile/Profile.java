package com.grouply.backend.profile;

import com.grouply.backend.position.Position;
import com.grouply.backend.social_link.SocialLink;
import com.grouply.backend.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "profiles")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long id;

    @Size(max = 500)
    @Column(length = 500)
    private String about;
    private String bannerUrl;


//    @OneToMany(mappedBy = "profile")
//    private Set<SocialLink> socialLinks;

    @ManyToMany
    private List<Position> positions = new ArrayList<>();



    //TODO add project participant in

    @OneToOne
    private User user;

}
