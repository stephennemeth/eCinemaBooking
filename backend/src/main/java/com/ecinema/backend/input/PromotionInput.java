package com.ecinema.backend.input;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class PromotionInput {

    @JsonProperty("promoCode")
    private String promoCode;

    @JsonProperty("discount")
    private Long discount;
    
    @JsonProperty("startDate")
    @Temporal(TemporalType.DATE)
    private Date startDate;

    @JsonProperty("endDate")
    @Temporal(TemporalType.DATE)
    private Date endDate;


}
