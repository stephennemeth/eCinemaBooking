package com.ecinema.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ecinema.backend.input.UserPromotionsInput;
import com.ecinema.backend.models.UserPromotions;
import com.ecinema.backend.service.UserPromotionsService;

import org.springframework.beans.factory.annotation.Qualifier;

@RestController
@RequestMapping("/api/v1/userPromotions")
@CrossOrigin("http://localhost:3000")
public class UserPromotionsController {

    @Autowired
    @Qualifier("userPromotionsService")
    private UserPromotionsService userPromotionsService;

    @PostMapping("/updateUserPromotionStatus")
    public ResponseEntity<?> updateUserPromotionStatus(@RequestBody UserPromotionsInput input) {
        try {
            UserPromotions userPromotions = this.userPromotionsService.updateUserPromotionStatus(input);
            return ResponseEntity.status(HttpStatus.CREATED).body(userPromotions);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
