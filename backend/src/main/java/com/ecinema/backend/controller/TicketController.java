package com.ecinema.backend.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecinema.backend.models.Ticket;
import com.ecinema.backend.input.TicketInput;
import com.ecinema.backend.service.TicketService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


@RestController
@RequestMapping("/api/v1/movie")
@CrossOrigin("http://localhost:3000")
public class TicketController {

    @Autowired
    @Qualifier("ticketService")
    private TicketService ticketService;

    @PostMapping("/createTicket")
    public ResponseEntity<Ticket> createTicket(@RequestBody TicketInput input) {
        Ticket ticket = this.ticketService.createTicket(input);
        return ResponseEntity.status(HttpStatus.CREATED).body(ticket);
    }
    
}
