package com.grouply.backend.features.activity;

import com.grouply.backend.features.activity.dto.ActivityDTO;
import com.grouply.backend.shared.util.EntityToDtoMapper;
import org.springframework.stereotype.Component;

@Component
public class ActivityMapper {

    public ActivityDTO toActivityDto(Activity entity) {
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
