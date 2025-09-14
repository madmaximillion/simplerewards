package com.madmaximillion.simplerewards.repo;

import com.madmaximillion.simplerewards.domain.RewardLedger;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RewardLedgerRepository extends JpaRepository<RewardLedger, Long> {
}