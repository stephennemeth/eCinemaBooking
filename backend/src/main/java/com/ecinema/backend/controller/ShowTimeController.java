package com.ecinema.backend.controller;

import java.util.Calendar;
import java.util.List;
import java.util.Optional;
import java.sql.Date;
import java.sql.Time;
import java.time.LocalTime;

import org.hibernate.type.descriptor.java.CalendarDateJavaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecinema.backend.exception.EmptyResponseException;
import com.ecinema.backend.input.ShowTimeInput;
import com.ecinema.backend.models.ShowTime;
import com.ecinema.backend.service.ShowTimeService;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/v1/showTime")
public class ShowTimeController {
    
    @Autowired
    @Qualifier("showTimeService")
    private ShowTimeService showTimeService;

    @GetMapping("/findByMovieId/{movieId}")
    public ResponseEntity<List<ShowTime>> findByMovieId(@PathVariable Long movieId) throws EmptyResponseException {
        List<ShowTime> showTimes = this.showTimeService.findByMovieId(movieId);
        for (ShowTime show : showTimes) {
            System.out.println(show.getShowRoomId());
        }

        if (showTimes.isEmpty()) {
            throw new EmptyResponseException("There are no showing for that movie");
        }
        return ResponseEntity.status(HttpStatus.OK).body(showTimes);
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<ShowTime> findById(@PathVariable Long id) throws Exception {
        Optional<ShowTime> showTime = this.showTimeService.findById(id);
        
        if (showTime.isPresent()) {
            ShowTime time = showTime.get();

            return ResponseEntity.status(HttpStatus.OK).body(time);
        }

        throw new EmptyResponseException("There was a problem finding that showid");
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody ShowTimeInput input) {

        try {
            LocalTime localTime = input.getStartTime().toLocalTime();
            localTime = localTime.plusMinutes(input.getDurationMinutes());
            localTime = localTime.plusHours(input.getDurationHours());
            Time endTime = Time.valueOf(localTime);

            Calendar cal = Calendar.getInstance();

            cal.setTime(input.getShowDate());

            cal.add(Calendar.DATE, 1);

            input.setShowDate(new Date(cal.getTimeInMillis()));

            System.out.println(input.getShowDate());
            ShowTime existing = this.showTimeService.findConflict(input.getStartTime(), endTime, input.getShowRoomId(), input.getShowDate());


            if (existing != null) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
            }
            
            ShowTime newShowTime = this.showTimeService.create(input, endTime);
            return ResponseEntity.status(HttpStatus.CREATED).body(newShowTime);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}