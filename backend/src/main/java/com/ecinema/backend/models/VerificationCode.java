package com.ecinema.backend.models;
import jakarta.persistence.*;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

 
@Data
@Entity
@Table(name = "verificationCode")
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class VerificationCode{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="codeId")
    private Long codeId;

    @Column(name ="codeType")
    private Integer codeType;

    @Column(name ="code")
    private String code;

    @Column(name="accountId")
    private Long accountId;

}
