package com.grouply.backend.profile;

import com.grouply.backend.profile.dto.ProfileDTO;
import com.grouply.backend.profile.dto.UpdateProfileDTO;
import com.grouply.backend.social_link.SocialLink;
import com.grouply.backend.social_link.dto.SocialLinkDTO;
import com.grouply.backend.user.User;
import com.grouply.backend.user.UserRepository;
import com.grouply.backend.util.EntityToDtoMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashSet;
import java.util.NoSuchElementException;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProfileService implements IProfileService {

    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;

    /**
     * this fetches profile when the user enters a specific profile
     * @param userId
     * @return
     */
    @Override
    public ProfileDTO getOneProfile(Long userId) {
        log.info("getting profile");
        Profile profile = fetchProfile(userId);
        return EntityToDtoMapper.toProfileDto(profile);
    }

    @Override
    public void UpdateProfile(Long userId ,UpdateProfileDTO dto) {

        log.info("Entering update profile");
        Profile profile = fetchProfile(userId);
        if (dto.getAbout().isEmpty()) {
            profile.setAbout(profile.getAbout());
        } else {
            profile.setAbout(dto.getAbout());
        }

        if (dto.getBannerUrl().isEmpty()) {
            profile.setBannerUrl(profile.getBannerUrl());
        } else {
            profile.setBannerUrl(dto.getBannerUrl());
        }

//        profile.setSocialLinks(toEntities(dto.getSocialLinkDTOS(), profile));

        profileRepository.save(profile);
        log.info("Profile Saved");

    }

    private User fetchUser(Long userId) {
        return userRepository.findById(userId).orElseThrow(()->new NoSuchElementException("User not found"));
    }

    private Profile fetchProfile(Long userId) {
        return profileRepository.findByUserId(userId).orElseThrow(() -> new NoSuchElementException("User not found"));
    }

//    private SocialLink toSocialLinksEntities(SocialLinkDTO dto, Profile profile) {
//        if (dto == null) return null;
//
//        return SocialLink.builder()
//                .id(dto.getId())
//                .link(dto.getLink())
//                .type(dto.getType())
//                .profile(profile)
//                .build();
//    }
//
//    private Set<SocialLink> toEntities(Set<SocialLinkDTO> dtos, Profile profile) {
//        if (dtos == null || dtos.isEmpty()) return Collections.emptySet();
//
//        Set<SocialLink> result = new HashSet<>(dtos.size());
//        for (SocialLinkDTO dto : dtos) {
//            if (dto != null) result.add(toSocialLinksEntities(dto, profile));
//        }
//        return result;
//    }
}
