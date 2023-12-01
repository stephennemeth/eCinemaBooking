package com.ecinema.backend.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecinema.backend.models.Booking;
import com.ecinema.backend.input.BookingInput;
import com.ecinema.backend.service.BookingService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/v1/movie")
@CrossOrigin("http://localhost:3000")
public class BookingController {

    @Autowired
    @Qualifier("bookingService")
    private BookingService bookingService;

    @PostMapping("/createBooking")
    public ResponseEntity<Booking> createBooking(@RequestBody BookingInput input) {
        Booking booking = this.bookingService.createBooking(input);
        return ResponseEntity.status(HttpStatus.CREATED).body(booking);
    }

    @GetMapping("/booking/{accountId}")
    public ResponseEntity<List<Map<String, Object>>> getBookingDetails(@PathVariable Long accountId) {
        List<Map<String, Object>> bookingDetails = this.bookingService.getBookingDetailsByAccountId(accountId);
    return ResponseEntity.ok(bookingDetails);
}

    
}
