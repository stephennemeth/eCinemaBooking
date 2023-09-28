package com.ecinema.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.ecinema.backend.exception.EmptyResponseException;

@ControllerAdvice
public class ExceptionController {

    @ExceptionHandler(EmptyResponseException.class)
    public ResponseEntity<String> handlerEmptyResponsException(EmptyResponseException ere) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ere.getMessage());
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }
}
