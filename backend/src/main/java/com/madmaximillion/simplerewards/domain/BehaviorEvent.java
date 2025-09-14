package com.madmaximillion.simplerewards.domain;

import jakarta.persistence.*;
import jdk.jfr.DataAmount;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Entity
@Data
public class BehaviorEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long childId;
    private int points;
    private String note;
    private Long createdByUserId;
    private Instant createdAt = Instant.now();
}