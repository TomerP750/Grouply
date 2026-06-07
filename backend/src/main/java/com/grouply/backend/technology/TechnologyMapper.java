package com.grouply.backend.technology;

import com.grouply.backend.technology.dto.TechnologyDTO;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Component
public class TechnologyMapper {


    public TechnologyDTO toDto(Technology entity) {
        return TechnologyDTO.builder()
                .id(entity.getId())
                .slug(entity.getSlug())
                .color(entity.getColor())
                .name(entity.getName())
                .build();
    }

    public Set<TechnologyDTO> toTechnologiesDtos(Set<Technology> entities) {
        if (entities == null || entities.isEmpty()) return Collections.emptySet();
        Set<TechnologyDTO> result = new HashSet<>(entities.size());
        for (Technology t : entities) {
            if (t != null) result.add(toDto(t));
        }
        return result;
    }

}
