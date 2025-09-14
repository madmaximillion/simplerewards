package com.madmaximillion.simplerewards.domain;

import jakarta.persistence.*;
import lombok.Data;

import java.time.Instant;

@Entity
@Data
public class RewardLedger {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long childId;
    private String source; // CHORE, MANUAL, ADJUSTMENT
    private String rewardType; // MONEY, POINTS, TREAT
    private double amount;
    private String status; // PENDING, GIVEN
    private Long choreId;
    private Instant createdAt = Instant.now();
    private Instant givenAt;
}