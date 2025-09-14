package com.madmaximillion.simplerewards.domain;

import jakarta.persistence.*;
import lombok.Data;

import java.time.Instant;

@Entity
@Data
public class ChoreEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long choreId;
    private Long childId;
    private String action; // MARK_DONE, PARENT_CONFIRM, PARENT_REJECT
    private Instant at = Instant.now();
}