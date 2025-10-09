package com.grouply.backend.technology;

import com.grouply.backend.exceptions.InvalidInputException;
import com.grouply.backend.technology.dto.TechnologyDTO;

import java.util.List;

public interface ITechnologyService {

    List<TechnologyDTO> allTechnologies();

    void addTechnology(String name) throws InvalidInputException;

    void deleteTechnology(Long techId);

}
