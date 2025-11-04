package com.grouply.backend.profile.dto;

import com.grouply.backend.social_link.dto.SocialLinkDTO;
import lombok.Data;

import java.util.Set;

@Data
public class UpdateProfileDTO {

    private String about;
    private String bannerUrl;
    private Set<SocialLinkDTO> socialLinkDTOS;

}
