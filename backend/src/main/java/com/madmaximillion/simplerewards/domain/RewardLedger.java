package com.madmaximillion.simplerewards.domain;

import com.madmaximillion.simplerewards.domain.enums.RewardSource;
import com.madmaximillion.simplerewards.domain.enums.RewardStatus;
import com.madmaximillion.simplerewards.domain.enums.RewardType;
import jakarta.persistence.*;
import lombok.Data;

import java.time.Instant;

@Entity
@Data
public class RewardLedger {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    @JoinColumn(name = "child_id")
    private User child;
    @Column(nullable = false)
    private RewardSource source;
    @Column(nullable = false)
    private RewardType rewardType;
    @Column(nullable = false)
    private double amount = 0;
    @Column(nullable = false)
    private RewardStatus status;
    @OneToOne
    @JoinColumn(name = "chore_id")
    private Chore SourceChore;
    @Column(nullable = false)
    private Instant createdAt = Instant.now();
    private Instant rewardedDate;
}