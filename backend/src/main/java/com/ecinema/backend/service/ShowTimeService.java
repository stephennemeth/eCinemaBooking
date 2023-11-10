package com.ecinema.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.ecinema.backend.models.ShowTime;
import com.ecinema.backend.repository.ShowTimeRepository;

@Service("showTimeService")
public class ShowTimeService {
    
    @Autowired
    @Qualifier("showTimeRepository")
    private ShowTimeRepository showTimeRepository;

    public List<ShowTime> findByMovieId(Long movieId) {
        return this.showTimeRepository.findByMovieId(movieId);
    }

    public Optional<ShowTime> findById(Long id) {
        return this.showTimeRepository.findById(id);
    }
}