package com.madmaximillion.simplerewards.service;

import com.madmaximillion.simplerewards.config.JwtUtil;
import com.madmaximillion.simplerewards.domain.User;
import com.madmaximillion.simplerewards.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepo, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public User register(User u) {
        u.setPasswordHash(passwordEncoder.encode(u.getPasswordHash()));
        return userRepo.save(u);
    }

    public Optional<String> login(String username, String rawPassword) {
        return userRepo.findByUsername(username)
                .filter(u -> passwordEncoder.matches(rawPassword, u.getPasswordHash()))
                .map(u -> jwtUtil.generateToken(
                        u.getUsername(),
                        Map.of("uid", u.getId(), "role", u.getRole(), "name", u.getDisplayName())
                ));
    }
}