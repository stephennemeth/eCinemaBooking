package com.ecinema.backend.repository;

import java.util.List;
import java.sql.Time;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecinema.backend.models.ShowTime;

@Repository("showTimeRepository")
public interface ShowTimeRepository extends JpaRepository<ShowTime, Long> {
    
    public List<ShowTime> findByMovieId(Long movieId);

    public ShowTime findByStartTimeBetweenAndEndTimeBetweenAndShowRoomId(Time t1, Time t2, Time t3, Time t4, Long showRoomId);
}