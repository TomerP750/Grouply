package com.grouply.backend.profile;

import com.grouply.backend.profile.dto.ProfileDTO;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
    Optional<Profile> findByUserId(Long userId);
}
