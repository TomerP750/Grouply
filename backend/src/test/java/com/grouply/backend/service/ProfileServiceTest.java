package com.grouply.backend.service;

import com.grouply.backend.profile.Profile;
import com.grouply.backend.profile.ProfileRepository;
import com.grouply.backend.profile.ProfileService;
import com.grouply.backend.profile.dto.ProfileDTO;
import com.grouply.backend.user.User;
import com.grouply.backend.user.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ProfileServiceTest {


    @Mock
    private ProfileRepository profileRepository;
    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private ProfileService profileService;

    private User user;
    private Profile profile;

    @BeforeEach
    void setUp() {
        user = User.builder()
                .id(1L)
                .build();
        profile = Profile.builder()
                .user(user)
                .build();
    }

    @Test
    void getOneProfile_returnsProfile_whenUserIdExists() {

        when(profileRepository.findByUserId(user.getId())).thenReturn(Optional.of(profile));

        ProfileDTO result = profileService.getOneProfile(1L);

        assertNotNull(result);
        assertEquals(result.getUser().getId(), 1L);

        verify(profileRepository).findByUserId(1L);

    }


}
