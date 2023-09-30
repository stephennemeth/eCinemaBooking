package com.ecinema.backend.service;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
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
        Movie movie = new Movie();

        movie.setMovieTitle(input.getMovieTitle());
        movie.setTrailerPicture(input.getTrailerPicture());
        movie.setTrailerVideo(input.getTrailerVideo());

        return this.movieRepository.save(movie);
    }

    public boolean doesMovieExist(Long id) {
        Optional<Movie> movie = this.movieRepository.findById(id);

        return movie.isPresent();
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

    public Movie updateMovie(Long movieId, Movie movie) {
        
        if (!this.doesMovieExist(movieId)) {
            throw new ResourceNotFoundException("This movie does not exist");
        }

        return this.movieRepository.save(movie);
    }
}
