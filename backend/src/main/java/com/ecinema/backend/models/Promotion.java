package com.ecinema.backend.models;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.sql.Date;

import org.hibernate.annotations.Formula;


@Data
@Entity
@Table(name = "promotions")
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class Promotion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="promoId")
    private Long promoId;

    @Column(name ="promoCode")
    private String promoCode;

    @Column(name ="discount")
    private Long discount;

    @Column(name ="startDate")
    @Temporal(TemporalType.DATE)
    private Date startDate;

    @Column(name = "endDate")
    @Temporal(TemporalType.DATE)
    private Date endDate;

    @Formula("(SELECT u.accountId FROM user u WHERE u.accountId = accountId)")
    private Long accountId;

}