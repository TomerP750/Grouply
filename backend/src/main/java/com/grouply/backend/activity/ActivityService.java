package com.grouply.backend.activity;

import com.grouply.backend.activity.dto.ActivityDTO;
import com.grouply.backend.user.User;
import com.grouply.backend.util.EntityToDtoMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ActivityService {

    private final ActivityRepository activityRepository;

    public List<ActivityDTO> getAllActivities(Long userid) {
        return activityRepository.findByUserId(userid).stream().map(this::toActivityDto).toList();
    }


    public void createActivity(String message, String navigateLink ,User user) {

        if (activityRepository.countByUserId(user.getId()) > 5) {
            Activity oldest = activityRepository.findTopByUserIdOrderByCreatedAtAsc(user.getId());
            if (oldest != null) {
                activityRepository.delete(oldest);
            }
        }

        Activity senderActivity = Activity.builder()
                .message(message)
                .navigateLink(navigateLink)
                .user(user)
                .build();

        activityRepository.save(senderActivity);
    }

    private ActivityDTO toActivityDto(Activity entity) {
        return ActivityDTO.builder()
                .id(entity.getId())
                .message(entity.getMessage())
                .user(EntityToDtoMapper.toUserDto(entity.getUser()))
                .createdAt(entity.getCreatedAt())
                .build();
    }

}
