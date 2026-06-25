package com.grouply.backend.features.profile.profile;

import com.grouply.backend.features.profile.dto.ProfileDTO;
import com.grouply.backend.features.profile.dto.UpdateProfileDTO;

public interface IProfileService {

    ProfileDTO getOneProfile(Long userId);

    void UpdateProfile(Long userId ,UpdateProfileDTO dto);

}
