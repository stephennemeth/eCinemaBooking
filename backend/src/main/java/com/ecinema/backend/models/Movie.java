package com.ecinema.backend.models;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

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
    @JsonProperty("movieId")
    private Long movieId;

    @Column(name ="movieTitle")
    @JsonProperty("movieTitle")
    private String movieTitle;

    @Column(name ="category")
    @JsonProperty("category")
    private String category;

    @Column(name ="cast")
    @JsonProperty("cast")
    private String cast;

    @Column(name = "director")
    @JsonProperty("director")
    private String director;

    @Column(name = "producer")
    @JsonProperty("producer")
    private String producer;

    @Column(name = "synopsis")
    @JsonProperty("synopsis")
    private String synopsis;

    @Column(name = "reviews")
    private Double reviews;

    @Column(name = "trailerPicture")
    @JsonProperty("trailerPicture")
    private String trailerPicture;

    @Column(name = "trailerVideo")
    @JsonProperty("trailerVideo")
    private String trailerVideo;

    @Column(name = "ratingId")
    @JsonProperty("ratingId")
    private String ratingId;

    @Column(name = "releaseDate")
    @Temporal(TemporalType.DATE)
    @JsonProperty("releaseDate")
    private Date releaseDate;

    @Column(name = "playing", columnDefinition = "TINYINT(1)")
    private Boolean playing;

    @Column(name = "durationMinutes")
    @JsonProperty("durationMinutes")
    private Integer Minutes;

    @Column(name = "durationHours")
    @JsonProperty("durationHours")
    private Integer hours;
}