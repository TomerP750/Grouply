package com.grouply.backend.profile.dto;

import com.grouply.backend.position.Position;
import com.grouply.backend.position.dto.PositionDTO;
import com.grouply.backend.social_link.SocialLink;
import com.grouply.backend.social_link.dto.SocialLinkDTO;
import com.grouply.backend.user.Dtos.UserDTO;
import com.grouply.backend.user.User;
import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Data
@Builder
public class ProfileDTO {

    private Long id;

    private String about;
    private String bannerUrl;

    private Set<SocialLinkDTO> socialLinks;

    private List<PositionDTO> positions = new ArrayList<>();

    private UserDTO user;

}
