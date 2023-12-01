package com.ecinema.backend.repository;

import com.ecinema.backend.models.ShowTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ecinema.backend.models.Booking;
import java.util.List;
import java.util.Map;

@Repository("bookingRepository")
public interface BookingRepository extends JpaRepository<Booking, Integer> {

    public List<Booking> findByShowTime(ShowTime showTime);

    @Query("SELECT new map(" +
       "b.bookingNumber as bookingNumber, " +
       "b.price as price, " +
       "(SELECT m.movieTitle FROM Movie m WHERE m.movieId = st.movieId) as movieTitle, " +
       "st.showDate as showDate, " +
       "st.startTime as startTime) " +
       "FROM Booking b " +
       "JOIN b.showTime st " +
       "WHERE b.user.accountId = :accountId")
    List<Map<String, Object>> findBookingDetailsByAccountId(@Param("accountId") Long accountId);
}
