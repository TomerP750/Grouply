package com.grouply.backend.features.technology;

import com.grouply.backend.features.technology.dto.TechnologyDTO;
import com.grouply.backend.shared.exceptions.InvalidInputException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class TechnologyMapper {

    private final TechnologyRepository technologyRepository;

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

    /**
     * Resolves and validates a set of technologies provided as DTOs into persistent Technology entities.
     *
     * This method is used during post creation to ensure that all referenced technologies exist in the database
     * before associating them with the post.
     *
     * Validation rules:
     * - The input set must not be null or empty.
     * - All DTOs must contain valid non-null IDs.
     * - All referenced Technology entities must exist in the database.
     *
     * If any of these conditions are violated, an exception is thrown to prevent creation of invalid post data.
     *
     * @param dtos the set of TechnologyDTO objects provided in the request
     * @return a validated set of Technology entities corresponding to the provided DTO IDs
     * @throws InvalidInputException if the input set is null or empty
     * @throws NoSuchElementException if one or more technology IDs do not exist in the database
     */
    public Set<Technology> toTechEntities(Set<TechnologyDTO> dtos) throws InvalidInputException {

        if (dtos == null || dtos.isEmpty()) {
            throw new InvalidInputException("Technologies list is empty");
        }

        Set<Long> ids = dtos.stream()
                .map(TechnologyDTO::getId)
                .filter(Objects::nonNull)
                .collect(Collectors.toSet());

        List<Technology> technologies = technologyRepository.findAllById(ids);

        if (technologies.size() != ids.size()) {
            throw new NoSuchElementException("Some technologies were not found");
        }

        return new HashSet<>(technologies);

    }

}
