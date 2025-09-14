package com.madmaximillion.simplerewards.domain;

import jakarta.persistence.*;
import lombok.Data;

import java.time.Instant;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String passwordHash;

    @Column(nullable = false)
    private String role; // PARENT or CHILD

    @Column(nullable = false)
    private String displayName;

    private Long parentId;

    private Instant createdAt = Instant.now();
}