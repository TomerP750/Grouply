package com.grouply.backend.social_link.dto;

import com.grouply.backend.profile.dto.ProfileDTO;
import com.grouply.backend.social_link.SocialType;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SocialLinkDTO {

    private Long id;
    private String link;
    private SocialType type;
    private ProfileDTO profile;

}

