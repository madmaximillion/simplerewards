package com.madmaximillion.simplerewards.repo;

import com.madmaximillion.simplerewards.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    List<User> findByParentId(Long id);
}