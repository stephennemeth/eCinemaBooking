package com.ecinema.backend.input;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@AllArgsConstructor
@Builder
@ToString
public class CheckoutInput {
    @JsonProperty("cardNumber")
    private String cardNumber;

    @JsonProperty("cardType")
    private String cardType;

    @JsonProperty("expirationDate")
    private String expirationDate; 

    @JsonProperty("address")
    private AddressInput address;
    
}
