package com.ecinema.backend.input;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class AddressInput {
    @JsonProperty("streetName")
    private String streetName;

    @JsonProperty("city")
    private String city;

    @JsonProperty("state")
    private String state;

    @JsonProperty("zipcode")
    private int zipcode;
}
