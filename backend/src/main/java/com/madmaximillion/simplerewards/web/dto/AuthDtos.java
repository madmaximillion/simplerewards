package com.madmaximillion.simplerewards.web.dto;

public class AuthDtos {

    public record LoginRequest(String username, String password) {}

    public record LoginResponse(String token) {}

    public record RegisterRequest(String username, String password, String displayName, String role, Long parentId) {}
}