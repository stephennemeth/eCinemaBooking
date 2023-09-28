package com.ecinema.backend.service;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.ecinema.backend.input.MovieInput;
import com.ecinema.backend.models.Movie;
import com.ecinema.backend.repository.MovieRepository;

@Service("movieService")
public class MovieService {
    
    @Autowired
    @Qualifier("movieRepository")
    private MovieRepository movieRepository;

    public Movie createMovie(MovieInput input) {
        Movie movie = new Movie(input);
        return this.movieRepository.save(movie);
    }

    public List<Movie> getAllMovies() {
        return this.movieRepository.findAll();
    }
    public List<Movie> getMoviesByTitle(String title) {
        return this.movieRepository.findByMovieTitleContainingIgnoreCase(title);
    }
    public List<Movie> getNowPlaying(Date date) {
        return this.movieRepository.findByReleaseDateLessThanEqualAndPlaying(date, true);
    }

    public List<Movie> getComingSoon(Date date) {
        return this.movieRepository.findByReleaseDateGreaterThanAndPlaying(date, true);
    }
}
