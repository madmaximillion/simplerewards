package com.madmaximillion.simplerewards.web;

import com.madmaximillion.simplerewards.domain.User;
import com.madmaximillion.simplerewards.service.AuthService;
import com.madmaximillion.simplerewards.web.dto.AuthDtos.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegisterRequest req) {
        User u = new User();
        u.setUsername(req.username());
        u.setPasswordHash(req.password());
        u.setDisplayName(req.displayName());
        u.setRole(req.role());
        return ResponseEntity.ok(authService.register(u));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest req) {
        return authService.login(req.username(), req.password())
                .map(token -> ResponseEntity.ok(new LoginResponse(token)))
                .orElse(ResponseEntity.status(401).build());
    }
}