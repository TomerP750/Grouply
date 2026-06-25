package com.grouply.backend.features.profile.profile;

import com.grouply.backend.features.profile.dto.ProfileDTO;
import com.grouply.backend.features.profile.dto.UpdateProfileDTO;
import com.grouply.backend.infrastructure.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @GetMapping("/{profileId}")
    public ProfileDTO oneProfile(@PathVariable Long profileId) {
        return profileService.getOneProfile(profileId);
    }

    @PutMapping("/update")
    public void updateProfile(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestBody UpdateProfileDTO dto) {
        Long userId = userDetails.getId();
        profileService.UpdateProfile(userId, dto);
    }

}
