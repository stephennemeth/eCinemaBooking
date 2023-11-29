package com.ecinema.backend.service;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

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
        Movie movie = Movie.builder()
                .movieTitle(input.getMovieTitle())
                .category(input.getCategory())
                .cast(input.getCast())
                .director(input.getDirector())
                .producer(input.getProducer())
                .synopsis(input.getSynopsis())
                .trailerPicture(input.getTrailerPicture())
                .trailerVideo(input.getTrailerVideo())
                .releaseDate(input.getReleaseDate())
                .hours(input.getDurationHours())
                .Minutes(input.getDurationMinutes())
                .build();

        return this.movieRepository.save(movie);
    }

    public List<Object[]> getAllMovies() {
        return this.movieRepository.findAllMinimal();
    }
    public List<Movie> getMoviesByTitle(String title) {
        return this.movieRepository.findByMovieTitleContainingIgnoreCase(title);
    }
    public List<Object[]> getNowPlaying(Date date) {
        return this.movieRepository.findNowPlaying(date, true);
    }

    public Optional<Movie> getMovieById(Long movieId) {
        return this.movieRepository.findById(movieId);
    }

    public List<Object[]> getComingSoon(Date date) {
        return this.movieRepository.findComingSoon(date, true);
    }

    public Movie updateMovie(Movie movie) {
        return this.movieRepository.save(movie);
    }

    public String getMovieTrailer(Long movieId) {
        return this.movieRepository.findTrailerByMovieId(movieId);
    }
}
