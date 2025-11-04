package com.grouply.backend.profile;

import com.grouply.backend.profile.dto.ProfileDTO;
import com.grouply.backend.profile.dto.UpdateProfileDTO;

public interface IProfileService {

    ProfileDTO getOneProfile(Long userId);

    void UpdateProfile(Long userId ,UpdateProfileDTO dto);

}
