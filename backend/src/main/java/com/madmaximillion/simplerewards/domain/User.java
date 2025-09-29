package com.madmaximillion.simplerewards.domain;

import com.madmaximillion.simplerewards.domain.enums.Role;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

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
    private Role role; // PARENT or CHILD

    @Column(nullable = false)
    private String displayName;

    private int points = 0;

    @ManyToOne
    @JoinColumn(name = "parent_id")
    private User parent;

    @OneToMany(mappedBy = "assignedChild")
    private List<Chore> chores;
}