package com.ecinema.backend.input;


import lombok.*;
import com.fasterxml.jackson.annotation.JsonProperty;

@Data
@AllArgsConstructor
@Builder
@ToString
public class BookingInput {

    @JsonProperty("accountId")
    private Long accountId;

    @JsonProperty("showTimeId")
    private Long showTimeId;

    @JsonProperty("price")
    private Double price; 
    
    @JsonProperty("promoId")
    private Long promoId;

    @JsonProperty("cardId")
    private Long cardId;
}


