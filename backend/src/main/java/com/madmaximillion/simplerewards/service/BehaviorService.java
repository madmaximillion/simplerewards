package com.madmaximillion.simplerewards.service;

import com.madmaximillion.simplerewards.domain.BehaviorEvent;
import com.madmaximillion.simplerewards.repo.BehaviorEventRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BehaviorService {

    private final BehaviorEventRepository repo;

    public BehaviorService(BehaviorEventRepository repo) {
        this.repo = repo;
    }

    public BehaviorEvent save(BehaviorEvent e) {
        return repo.save(e);
    }

    public List<BehaviorEvent> findAll() {
        return repo.findAll();
    }
}