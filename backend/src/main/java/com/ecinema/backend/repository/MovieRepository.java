package com.ecinema.backend.repository;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecinema.backend.models.Movie;

@Repository("movieRepository")
public interface MovieRepository extends JpaRepository<Movie, Long>{

    public List<Movie> findByMovieTitleContainingIgnoreCase(String title);
    public List<Movie> findByReleaseDateLessThanEqualAndPlaying(Date date, Boolean playing);
    public List<Movie> findByReleaseDateGreaterThanAndPlaying(Date date, Boolean playing);
}
