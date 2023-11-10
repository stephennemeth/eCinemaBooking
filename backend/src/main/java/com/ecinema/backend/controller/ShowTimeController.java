package com.ecinema.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecinema.backend.exception.EmptyResponseException;
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

        if (showTimes.isEmpty()) {
            throw new EmptyResponseException("There are no showing for that movie");
        }

        return ResponseEntity.status(HttpStatus.OK).body(showTimes);
    }
}