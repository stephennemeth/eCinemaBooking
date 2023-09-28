package com.ecinema.backend.input;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class MovieInput {

    @JsonProperty("movieTitle")
    private String movieTitle;

    @JsonProperty("category")
    private String category;

    @JsonProperty("cast")
    private String cast;

    @JsonProperty("director")
    private String director;

    @JsonProperty("producer")
    private String producer;

    @JsonProperty("synopsis")
    private String synopsis;

    @JsonProperty("reviews")
    private Double reviews;

    @JsonProperty("trailerPicture")
    private String trailerPicture;

    @JsonProperty("trailerVideo")
    private String trailerVideo;

    @JsonProperty("releaseDate")
    private Date releaseDate;

    @JsonProperty("usRatingCode")
    private String usRatingCode;
}
