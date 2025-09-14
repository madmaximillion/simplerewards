package com.madmaximillion.simplerewards.service;

import com.madmaximillion.simplerewards.domain.RewardLedger;
import com.madmaximillion.simplerewards.repo.RewardLedgerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RewardService {

    private final RewardLedgerRepository repo;

    public RewardService(RewardLedgerRepository repo) {
        this.repo = repo;
    }

    public RewardLedger save(RewardLedger r) {
        return repo.save(r);
    }

    public List<RewardLedger> findAll() {
        return repo.findAll();
    }
}