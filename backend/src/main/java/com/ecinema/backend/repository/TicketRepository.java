package com.ecinema.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecinema.backend.models.Ticket;

@Repository("ticketRepository")
public interface TicketRepository extends JpaRepository<Ticket, Integer> {

}