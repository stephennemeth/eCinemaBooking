package com.ecinema.backend.models;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.sql.Date;

@Data
@Entity
@Table(name = "movies")
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="movieId")
    private Long movieId;

    @Column(name ="movieTitle")
    private String movieTitle;

    @Column(name ="category")
    private String category;

    @Column(name ="cast")
    private String cast;

    @Column(name = "director")
    private String director;

    @Column(name = "producer")
    private String producer;

    @Column(name = "synopsis")
    private String synopsis;

    @Column(name = "reviews")
    private Double reviews;

    @Column(name = "trailerPicture")
    private String trailerPicture;

    @Column(name = "trailerVideo")
    private String trailerVideo;

    @Column(name = "ratingId")
    private String ratingId;

    @Column(name = "releaseDate")
    @Temporal(TemporalType.DATE)
    private Date releaseDate;

    @Column(name = "playing", columnDefinition = "TINYINT(1)")
    private Boolean playing;

}