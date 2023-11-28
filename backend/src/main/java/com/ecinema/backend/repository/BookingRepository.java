package com.ecinema.backend.repository;

import com.ecinema.backend.models.ShowTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecinema.backend.models.Booking;

import java.util.List;

@Repository("bookingRepository")
public interface BookingRepository extends JpaRepository<Booking, Integer> {

    public List<Booking> findByShowTime(ShowTime showTime);
}
