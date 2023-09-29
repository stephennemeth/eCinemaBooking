package com.ecinema.backend.models.keys;

import java.io.Serializable;
import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Embeddable
public class ShowTimeCompositeKey implements Serializable {
    
    @Column(name = "movieId")
    private Long movieId;

    @Column(name = "screenId")
    private Long TheaterId;

    @Column(name = "date")
    @Temporal(TemporalType.DATE)
    private Date date;
}
