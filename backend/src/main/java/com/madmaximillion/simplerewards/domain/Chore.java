package com.madmaximillion.simplerewards.domain;

import jakarta.persistence.*;
import lombok.Data;

import java.time.Instant;

@Entity
@Data
public class Chore {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String scheduleType; // DAILY or WEEKLY
    private boolean expiresEndOfPeriod;
    private Long createdByUserId;
    private Long assignedChildId;
    private String rewardType; // MONEY, POINTS, TREAT
    private double rewardValue;
    private String status; // TODO, AWAITING_PARENT, APPROVED, REJECTED
    private boolean isAdhoc;
    private Instant dueDate;
    private Instant createdAt = Instant.now();
    private Instant updatedAt;
}