package com.ecinema.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecinema.backend.models.Seat;
import com.ecinema.backend.service.SeatService;

import com.ecinema.backend.input.SeatInput;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/v1/seats")
@CrossOrigin("http://localhost:3000")
public class SeatController {
    
    @Autowired
    @Qualifier("seatService")
    private SeatService seatService;

    @GetMapping("/getByShowId/{id}")
    public ResponseEntity<List<Seat>> getByShowId(@PathVariable Long id) {
        
        List<Seat> seats = this.seatService.findByShowTimeId(id);

        if (seats == null || seats.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(seats);
    }

    @PostMapping("/updateSeatStatus")
    public ResponseEntity<List<Long>> updateSeatStatus(@RequestBody SeatInput input) {

        List<Long> seatIds = input.getSeats();

        for (Long seatId: seatIds) {
            this.seatService.updateSeatStatus(seatId);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(seatIds);
    }


}
