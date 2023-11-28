package com.ecinema.backend.service;

import java.util.List;
import java.util.Optional;
import java.sql.Time;
import java.sql.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.ecinema.backend.input.ShowTimeInput;
import com.ecinema.backend.models.Seat;
import com.ecinema.backend.models.ShowTime;
import com.ecinema.backend.repository.ShowTimeRepository;

@Service("showTimeService")
public class ShowTimeService {
    
    private static final int numSeats = 64;

    @Autowired
    @Qualifier("showTimeRepository")
    private ShowTimeRepository showTimeRepository;

    @Autowired
    @Qualifier("seatService")
    private SeatService seatService;

    public List<ShowTime> findByMovieId(Long movieId) {
        return this.showTimeRepository.findByMovieId(movieId);
    }

    public Optional<ShowTime> findById(Long id) {
        return this.showTimeRepository.findById(id);
    }

    public ShowTime findConflict(Time startTime, Time endTime, Long showRoomId, Date showDate) {
        return this.showTimeRepository.findByEndTimeBetweenAndStartTimeBetweenAndShowDateAndShowRoomId(startTime, endTime, startTime, endTime, showDate, showRoomId);
    }

    public ShowTime create(ShowTimeInput input, Time endTime) {
        
        ShowTime time = ShowTime.builder()
                                .movieId(input.getMovieId())
                                .showRoomId(input.getShowRoomId())
                                .startTime(input.getStartTime())
                                .endTime(endTime)
                                .showDate(input.getShowDate())
                                .build();

        this.showTimeRepository.save(time);
        List<Seat> seats = this.seatService.createSeats(time.getShowTimeId(), time.getShowRoomId(), numSeats);
        time.setSeats(seats);
        return time;
    }

    public void deleteShowTime(Long showTimeId) {

        this.seatService.deleteSeats(showTimeId);
        this.showTimeRepository.deleteById(showTimeId);
    }
}