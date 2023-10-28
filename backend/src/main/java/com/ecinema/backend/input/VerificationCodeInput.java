package com.ecinema.backend.input;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class VerificationCodeInput {
    @JsonProperty("code")
    private String code;

    @JsonProperty("codeType")
    private Integer codeType;

    @JsonProperty("accountId")
    private Long accountId;

}
