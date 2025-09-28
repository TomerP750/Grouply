package com.grouply.backend.profile;

import com.grouply.backend.profile.dto.ProfileDTO;
import com.grouply.backend.profile.dto.UpdateProfileDTO;
import lombok.RequiredArgsConstructor;
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
    public void updateProfile(@RequestBody UpdateProfileDTO dto) {
        profileService.UpdateProfile(dto);
    }

}
