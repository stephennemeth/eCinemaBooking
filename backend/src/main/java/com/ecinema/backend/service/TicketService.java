package com.ecinema.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.ecinema.backend.input.SeatInput;
import com.ecinema.backend.input.TicketInput;
import com.ecinema.backend.models.Seat;
import com.ecinema.backend.models.Ticket;
import com.ecinema.backend.repository.TicketRepository;

import com.ecinema.backend.enums.Status;
import com.ecinema.backend.models.SeatStatus;

import java.util.List;

@Service("ticketService")
public class TicketService {


    @Autowired
    @Qualifier("ticketRepository")
    private TicketRepository ticketRepository;


    public Ticket createTicket(TicketInput input) {
        Ticket ticket = new Ticket();
        ticket.setPrice(input.getPrice());
        return this.ticketRepository.save(ticket);
    }

    
}
