package com.madmaximillion.simplerewards.service;

import com.madmaximillion.simplerewards.domain.Chore;
import com.madmaximillion.simplerewards.repo.ChoreRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChoreService {

    private final ChoreRepository repo;

    public ChoreService(ChoreRepository repo) {
        this.repo = repo;
    }

    public Chore save(Chore c) {
        return repo.save(c);
    }

    public Optional<Chore> findById(Long id) {
        return repo.findById(id);
    }

    public List<Chore> findByChild(Long childId) {
        return repo.findByAssignedChildId(childId);
    }
}