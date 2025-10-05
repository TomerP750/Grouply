package com.grouply.backend.user;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Page<User> findAll(Pageable pageable);

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    boolean existsByIdAndRole(Long userId, Role role);

    @Query("""
  SELECT u FROM User u
  WHERE LOWER(u.username)   LIKE LOWER(CONCAT('%', :q, '%'))
     OR LOWER(u.firstName)  LIKE LOWER(CONCAT('%', :q, '%'))
     OR LOWER(u.lastName)   LIKE LOWER(CONCAT('%', :q, '%'))
""")
    Page<User> search(@Param("q") String q, Pageable pageable);


    boolean existsByUsername(String username);

    boolean existsByEmailIgnoreCaseAndIdNot(String email, Long id);
}
