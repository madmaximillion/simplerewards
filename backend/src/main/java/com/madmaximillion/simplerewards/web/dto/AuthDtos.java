package com.madmaximillion.simplerewards.web.dto;

import com.madmaximillion.simplerewards.domain.enums.Role;

public class AuthDtos {

    public record LoginRequest(String username, String password) {}

    public record LoginResponse(String token) {}

    public record RegisterRequest(String username, String password, String displayName, Role role) {}
}