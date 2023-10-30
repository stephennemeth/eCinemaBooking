package com.ecinema.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecinema.backend.models.Payment;

@Repository("paymentRepository")
public interface PaymentRepository extends JpaRepository<Payment, Long> {

}
