package com.ecinema.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecinema.backend.models.Booking;

@Repository("bookingRepository")
public interface BookingRepository extends JpaRepository<Booking, Integer> {

}
