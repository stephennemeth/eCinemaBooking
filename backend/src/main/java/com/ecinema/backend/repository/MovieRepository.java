package com.ecinema.backend.repository;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ecinema.backend.models.Movie;

@Repository("movieRepository")
public interface MovieRepository extends JpaRepository<Movie, Long>{

    public List<Movie> findByMovieTitleContainingIgnoreCase(String title);

    @Query("SELECT m.trailerPicture, m.id, m.movieTitle FROM Movie m WHERE m.releaseDate <= ?1 AND m.playing = ?2")
    public List<Object[]> findNowPlaying(Date date, Boolean playing);

    @Query("SELECT m.trailerPicture, m.id, m.movieTitle FROM Movie m WHERE m.releaseDate > ?1 AND m.playing = ?2")
    public List<Object[]> findComingSoon(Date date, Boolean playing);

    @Query("SELECT m.trailerPicture, m.id, m.movieTitle FROM Movie m")
    public List<Object[]> findAllMinimal();

    @Query("SELECT m.trailerVideo FROM Movie m WHERE m.movieId = ?1")
    public String findTrailerByMovieId(Long movieId);
}
