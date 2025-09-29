package com.madmaximillion.simplerewards.repo;

import com.madmaximillion.simplerewards.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(final String username);
    List<User> findByParentId(final Long id);
}