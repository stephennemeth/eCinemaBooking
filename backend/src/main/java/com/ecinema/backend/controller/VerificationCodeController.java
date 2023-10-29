package com.ecinema.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ecinema.backend.exception.EmptyResponseException;

import com.ecinema.backend.input.VerificationCodeInput;
import com.ecinema.backend.models.VerificationCode;
import com.ecinema.backend.service.VerificationCodeService;

@RestController
@RequestMapping("/api/v1/vcode")
@CrossOrigin("http://localhost:3000")
public class VerificationCodeController {
    @Autowired
    @Qualifier("verificationCodeService")
    private VerificationCodeService verificationCodeService;

    @PostMapping("/createPswCode/{accountId}")
    public ResponseEntity<VerificationCode> createPswCode(@PathVariable Long accountId){
        VerificationCode verificationCode=this.verificationCodeService.createRegCode(accountId);
        return ResponseEntity.status(HttpStatus.CREATED).body(verificationCode);
    }
    @PostMapping("/createRegCode")
    public ResponseEntity<VerificationCode> createRegCode(@RequestBody VerificationCodeInput input){
        VerificationCode verificationCode=this.verificationCodeService.createRegCode(input);
        return ResponseEntity.status(HttpStatus.CREATED).body(verificationCode);
    }
    @GetMapping("/getAllCodes")
    public ResponseEntity<List<VerificationCode>> getAllCodes()throws EmptyResponseException {
       List<VerificationCode> verificationCode = this.verificationCodeService.getAllCodes();
       if (verificationCode.isEmpty()){
        throw new EmptyResponseException("There are no codes available");
       }
       return ResponseEntity.status(HttpStatus.OK).body(verificationCode);
    }
}
