package com.grouply.backend.technology;

import com.grouply.backend.exceptions.InvalidInputException;

public interface ITechnologyService {

    void addTechnology(String name) throws InvalidInputException;

    void deleteTechnology(Long techId);

}
