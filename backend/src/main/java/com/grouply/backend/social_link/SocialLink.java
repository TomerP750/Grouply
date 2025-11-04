package com.grouply.backend.social_link;

import com.grouply.backend.profile.Profile;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "social_links")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class SocialLink {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String link;

    @Enumerated(EnumType.STRING)
    private SocialType type;

    @ManyToOne
    private Profile profile;

}
