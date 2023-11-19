package com.ecinema.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.ecinema.backend.enums.Status;
import com.ecinema.backend.models.Seat;
import com.ecinema.backend.models.SeatStatus;
import com.ecinema.backend.repository.SeatRepository;

@Service("seatService")
public class SeatService {
    
    @Autowired
    @Qualifier("seatRepository")
    private SeatRepository seatRepository;


    public List<Seat> findByShowTimeId(Long showTimeId) {
        return this.seatRepository.findByShowTimeId(showTimeId);
    }

    public List<Seat> createSeats(Long showTimeId, Long showRoomId, int numSeats) {
        List<Seat> seats = new ArrayList<Seat>();
        for (int i = 0; i < numSeats; i++) {
            Seat seat = Seat.builder()
                        .showRoomId(showRoomId)
                        .showTimeId(showTimeId)
                        .seatStatusId(2L)
                        .build();
            seats.add(seat);
        }

        return this.seatRepository.saveAll(seats);
    }
    public Seat updateSeatStatus(Long seatId) {
        Optional<Seat> seat = this.seatRepository.findById(seatId);

        Seat s = seat.get();

        SeatStatus status = new SeatStatus();
        status.setSeatStatusId(1L);
        status.setStatus(Status.OCCUPIED);
        s.setSeatStatusId(1L);

        return this.seatRepository.save(s);
    }
}
