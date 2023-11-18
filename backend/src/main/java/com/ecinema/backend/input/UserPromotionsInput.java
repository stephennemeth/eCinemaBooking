package com.ecinema.backend.input;


import lombok.*;
import com.fasterxml.jackson.annotation.JsonProperty;

@Data
@AllArgsConstructor
@Builder
@ToString
public class UserPromotionsInput {

    @JsonProperty("accountId")
    private Long accountId;

    
    @JsonProperty("promoId")
    private Long promoId;

    @JsonProperty("promoUsed")
    private Boolean promoUsed;
}
