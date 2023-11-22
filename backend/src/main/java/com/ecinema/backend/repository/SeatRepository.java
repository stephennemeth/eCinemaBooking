package com.ecinema.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecinema.backend.models.Seat;

@Repository("seatRepository")
public interface SeatRepository extends JpaRepository<Seat, Long> {

    public List<Seat> findByShowTimeId(Long showTimeId);
    public List<Seat> findByShowTimeIdOrderBySeatId(Long showTimeId);
}
