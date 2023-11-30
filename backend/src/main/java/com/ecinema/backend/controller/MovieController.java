package com.ecinema.backend.controller;

import java.sql.Date;
import java.util.Calendar;
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
    public ResponseEntity<List<Object[]>> getAllMovies() throws EmptyResponseException {
        List<Object[]> movies = this.movieService.getAllMovies();

        if (movies.isEmpty()) {
            throw new EmptyResponseException("There are no movies available");
        }

        return ResponseEntity.status(HttpStatus.OK).body(movies);
    }
    @GetMapping("/getByTitle/{title}")
    public ResponseEntity<List<Object[]>> getMoviesByTitle(@PathVariable String title) throws EmptyResponseException {

        List<Object[]> movies = this.movieService.getMoviesByTitle(title);

        if (movies.isEmpty()) {
            throw new EmptyResponseException("There are no movies with that title or contain that title");
        }

        return ResponseEntity.status(HttpStatus.OK).body(movies);
    }

    @GetMapping("/getMovie/{movieId}")
    public ResponseEntity<?> getMovieById(@PathVariable Long movieId) throws EmptyResponseException {
       return ResponseEntity.status(HttpStatus.OK).body(this.movieService.getMovieById(movieId));
    }

    @GetMapping("/getNowPlaying")
    public ResponseEntity<List<Object[]>> getNowPlaying() throws EmptyResponseException {
        Date date = new Date(System.currentTimeMillis());

        List<Object[]> movies = this.movieService.getNowPlaying(date);

        if (movies.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(movies);
    }

    @GetMapping("/getComingSoon")
    public ResponseEntity<List<Object[]>> getComingSoon() throws EmptyResponseException {
        Date date = new Date(System.currentTimeMillis());

        List<Object[]> movies = this.movieService.getComingSoon(date);

        if (movies.isEmpty()) {
            throw new EmptyResponseException("There are no movies coming");
        }

        return ResponseEntity.status(HttpStatus.OK).body(movies);
    }

    @PostMapping("/create")
    public ResponseEntity<Movie> createMovie(@RequestBody MovieInput input) {
        System.out.println(input.getReleaseDate());
        Movie movie = this.movieService.createMovie(input);
        return ResponseEntity.status(HttpStatus.CREATED).body(movie);
    }

    @PostMapping("/update")
    public ResponseEntity<Movie> updateMovie(@RequestBody Movie movie)  {
        Calendar cal = Calendar.getInstance();

        cal.setTime(movie.getReleaseDate());

        cal.add(Calendar.DATE, 1);

        movie.setReleaseDate(new Date(cal.getTimeInMillis()));
        
        Movie movieUpdated = this.movieService.updateMovie(movie);
        return ResponseEntity.status(HttpStatus.OK).body(movieUpdated);
    }

    @GetMapping("/trailer/{movieId}")
    public ResponseEntity<String> getTrailerVideo(@PathVariable Long movieId) {

        String trailerVideo = this.movieService.getMovieTrailer(movieId);

        return ResponseEntity.status(HttpStatus.OK).body(trailerVideo);
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Object[]>> getByCategory(@PathVariable String category) {
        List<Object[]> movies = this.movieService.getByCategory(category);

        return ResponseEntity.status(HttpStatus.OK).body(movies);
    }
}
