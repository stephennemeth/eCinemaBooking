package com.ecinema.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.ecinema.backend.input.BookingInput;
import com.ecinema.backend.models.Booking;
import com.ecinema.backend.repository.BookingRepository;



@Service("bookingService")
public class BookingService {


    @Autowired
    @Qualifier("bookingRepository")
    private BookingRepository bookingRepository;


    public Booking createBooking(BookingInput input) {
        Booking booking = new Booking();

        booking.setUserId(input.getAccountId());
        booking.setShowTimeId(input.getShowTimeId());
        booking.setPrice(input.getPrice());
        booking.setPromotionId(input.getPromoId());
        booking.setPaymentId(input.getCardId());

        return this.bookingRepository.save(booking);
    }

    
}
