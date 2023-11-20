package com.ecinema.backend.repository;

import java.util.List;
import java.sql.Date;
import java.sql.Time;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ecinema.backend.models.ShowTime;

@Repository("showTimeRepository")
public interface ShowTimeRepository extends JpaRepository<ShowTime, Long> {
    
    public List<ShowTime> findByMovieId(Long movieId);

    @Query("SELECT m from ShowTime m WHERE ((m.startTime >= ?1 OR m.startTime <= ?2) OR (m.endTime >= ?3 OR m.endTime <= ?4)) AND m.showDate = ?5 AND m.showRoomId = ?6")
    public ShowTime findByEndTimeBetweenAndStartTimeBetweenAndShowDateAndShowRoomId(Time t1, Time t2, Time t3, Time t4, Date showDate, Long showRoomId);
}