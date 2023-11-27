package com.ecinema.backend.repository;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecinema.backend.models.Movie;

@Repository("movieRepository")
public interface MovieRepository extends JpaRepository<Movie, Long>{

    public List<Movie> findByMovieTitleContainingIgnoreCase(String title);

    @Query("select m.trailerPicture, m.id, m.movieTitle from movies m where m.releaseDate <= ?1 and m.playing = ?2")
    public List<Movie> findByReleaseDateLessThanEqualAndPlaying(Date date, Boolean playing);

    @Query("select m.trailerPicture, m.id, m.movieTitle from movies m where m.releaseDate > ?1 and m.playing = ?2")
    public List<Movie> findByReleaseDateGreaterThanAndPlaying(Date date, Boolean playing);
}
