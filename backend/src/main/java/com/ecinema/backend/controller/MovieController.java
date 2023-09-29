package com.ecinema.backend.controller;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ecinema.backend.exception.EmptyResponseException;
import com.ecinema.backend.input.MovieInput;
import com.ecinema.backend.models.Movie;
import com.ecinema.backend.service.MovieService;

@RestController
@RequestMapping("/api/v1/movie")
@CrossOrigin("http://localhost:3000")
public class MovieController {
    
    @Autowired
    @Qualifier("movieService")
    private MovieService movieService;

    @GetMapping("/getAllMovies")
    public ResponseEntity<List<Movie>> getAllMovies() throws EmptyResponseException {
        List<Movie> movies = this.movieService.getAllMovies();

        if (movies.isEmpty()) {
            throw new EmptyResponseException("There are no movies available");
        }

        return ResponseEntity.status(HttpStatus.OK).body(movies);
    }
    @GetMapping("/getByTitle/{title}")
    public ResponseEntity<List<Movie>> getMoviesByTitle(@PathVariable String title) throws EmptyResponseException {

        List<Movie> movies = this.movieService.getMoviesByTitle(title);

        if (movies.isEmpty()) {
            throw new EmptyResponseException("There are no movies with that title or contain that title");
        }

        return ResponseEntity.status(HttpStatus.OK).body(movies);
    }

    @GetMapping("/getNowPlaying")
    public ResponseEntity<List<Movie>> getNowPlaying() throws EmptyResponseException {
        Date date = new Date(System.currentTimeMillis());

        List<Movie> movies = this.movieService.getNowPlaying(date);

        if (movies.isEmpty()) {
            throw new EmptyResponseException("There are no movies currently playing");
        }

        return ResponseEntity.status(HttpStatus.OK).body(movies);
    }

    @GetMapping("/getComingSoon")
    public ResponseEntity<List<Movie>> getComingSoon() throws EmptyResponseException {
        Date date = new Date(System.currentTimeMillis());

        List<Movie> movies = this.movieService.getComingSoon(date);

        if (movies.isEmpty()) {
            throw new EmptyResponseException("There are no movies coming");
        }

        return ResponseEntity.status(HttpStatus.OK).body(movies);
    }

    @PostMapping("/create")
    public ResponseEntity<Movie> createMovie(@RequestBody MovieInput input) {
        Movie movie = this.movieService.createMovie(input);
        return ResponseEntity.status(HttpStatus.CREATED).body(movie);
    }
}
