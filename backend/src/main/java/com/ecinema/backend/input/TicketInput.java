package com.ecinema.backend.input;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class TicketInput {

    @JsonProperty("price")
    private Double price;
    
}
