package com.grouply.backend.profile;

import com.grouply.backend.profile.dto.ProfileDTO;
import com.grouply.backend.profile.dto.UpdateProfileDTO;
import com.grouply.backend.user.User;
import com.grouply.backend.user.UserRepository;
import com.grouply.backend.util.EntityToDtoMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProfileService implements IProfileService {

    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;

    @Override
    public ProfileDTO getOneProfile(Long userId) {
        log.info("getting profile");
        Profile profile = profileRepository.findByUserId(userId).orElseThrow(() -> new NoSuchElementException("User not found"));
        return EntityToDtoMapper.toProfileDto(profile);
    }

    @Override
    public void UpdateProfile(UpdateProfileDTO dto) {

    }

    private User fetchUser(Long userId) {
        return userRepository.findById(userId).orElseThrow(()->new NoSuchElementException("User not found"));
    }
}
