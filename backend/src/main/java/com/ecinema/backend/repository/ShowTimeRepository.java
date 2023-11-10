package com.ecinema.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecinema.backend.models.ShowTime;

@Repository("showTimeRepository")
public interface ShowTimeRepository extends JpaRepository<ShowTime, Long> {
    
    public List<ShowTime> findByMovieId(Long movieId);
}