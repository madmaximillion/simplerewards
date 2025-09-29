package com.madmaximillion.simplerewards.service;

import com.madmaximillion.simplerewards.domain.User;
import com.madmaximillion.simplerewards.domain.enums.Role;
import com.madmaximillion.simplerewards.repo.UserRepository;
import com.madmaximillion.simplerewards.web.dto.CreateChildRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class ChildServiceImpl implements ChildService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public ChildServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User addChild(User parent, CreateChildRequest request) {
        if (userRepository.findByUsername(request.username()).isPresent()) {
            throw new IllegalArgumentException("Username already exists");
        }

        User child = new User();
        child.setDisplayName(request.displayName());
        child.setUsername(request.displayName());
        // Setting username for now as currently not looking to secure the user account
        child.setPasswordHash(passwordEncoder.encode(request.displayName()));
        child.setRole(Role.CHILD);
        child.setParent(parent);
        child.setPoints(0);

        return userRepository.save(child);
    }

    public User getChild(Long childId) {
        return userRepository.findById(childId)
                .orElseThrow(() -> new RuntimeException("Child not found"));
    }
}
