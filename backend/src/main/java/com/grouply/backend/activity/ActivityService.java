package com.grouply.backend.activity;

import com.grouply.backend.activity.dto.ActivityDTO;
import com.grouply.backend.user.User;
import com.grouply.backend.shared.util.EntityToDtoMapper;
import com.grouply.backend.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ActivityService {

    private final ActivityRepository activityRepository;
    private final UserService userService;

    public List<ActivityDTO> getAllActivities(Long userid) {
        return activityRepository.findAllByUserIdOrderByCreatedAtDesc(userid).stream().map(this::toActivityDto).toList();
    }


    public void createActivity(String message, String navigateLink, ActivityType type ,Long userId) {

        if (activityRepository.countByUserId(userId) > 5) {
            Activity oldest = activityRepository.findTopByUserIdOrderByCreatedAtAsc(userId);
            if (oldest != null) {
                activityRepository.delete(oldest);
            }
        }

        User user = userService.findOneUser(userId);

        Activity senderActivity = Activity.builder()
                .message(message)
                .navigateLink(navigateLink)
                .type(type)
                .user(user)
                .build();

        activityRepository.save(senderActivity);
    }

    private ActivityDTO toActivityDto(Activity entity) {
        return ActivityDTO.builder()
                .id(entity.getId())
                .message(entity.getMessage())
                .activityType(entity.getType())
                .navigateLink(entity.getNavigateLink())
                .user(EntityToDtoMapper.toUserDto(entity.getUser()))
                .createdAt(entity.getCreatedAt())
                .build();
    }

}
