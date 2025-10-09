package com.grouply.backend.technology;

import com.grouply.backend.exceptions.InvalidInputException;
import com.grouply.backend.technology.dto.TechnologyDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@Slf4j
@RequiredArgsConstructor
public class TechnologyService implements ITechnologyService {

    private final TechnologyRepository technologyRepository;

    @Override
    public List<TechnologyDTO> allTechnologies() {
        return technologyRepository.findAll().stream().map(this::toDto).toList();
    }

    @Override
    public void addTechnology(String name) throws InvalidInputException {

        log.info("Entering add technology");
        if (name.isEmpty()) {
            throw new InvalidInputException("Empty name");
        }

        Technology technology = Technology.builder()
                .name(name)
                .build();
        technologyRepository.save(technology);
        log.info("Successfully added technology");

    }

    @Override
    public void deleteTechnology(Long techId) {
        log.info("Entering delete technology");
        if (!technologyRepository.existsById(techId)) {
            throw new NoSuchElementException("Technology not found");
        }
        technologyRepository.deleteById(techId);
        log.info("Successfully delete technology");
    }


    private TechnologyDTO toDto(Technology entity) {
        return TechnologyDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .build();
    }
}
