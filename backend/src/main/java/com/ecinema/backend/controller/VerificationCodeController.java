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
import com.ecinema.backend.service.EmailService;
import com.ecinema.backend.service.VerificationCodeService;

@RestController
@RequestMapping("/api/v1/vcode")
@CrossOrigin("http://localhost:3000")
public class VerificationCodeController {
    @Autowired
    @Qualifier("verificationCodeService")
    private VerificationCodeService verificationCodeService;

    @Autowired
    @Qualifier("emailService")
    private EmailService emailService;

    @PostMapping("/createPswCode/{accountId}/{email}")
    public ResponseEntity<VerificationCode> createPswCode(@PathVariable Long accountId, @PathVariable String email){
        VerificationCode verificationCode=this.verificationCodeService.createPswCode(accountId);
        this.emailService.sendPassChangeEmail(email, verificationCode.getCode());
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
       if (verificationCode.isEmpty()) {
        throw new EmptyResponseException("There are no codes available");
       }
       return ResponseEntity.status(HttpStatus.OK).body(verificationCode);
    }

    @PostMapping("/verifypasswordcode")
    public ResponseEntity<VerificationCode> verifyPasswordCode(@RequestBody VerificationCodeInput input) throws EmptyResponseException {
        VerificationCode code = this.verificationCodeService.verifyPasswordCode(input);

        if (code == null) {
            throw new EmptyResponseException("Code does not match");
        }
        
        this.verificationCodeService.deleteCode(code);
        return ResponseEntity.status(HttpStatus.OK).body(code); 
    }
    @GetMapping("/getCodeById/{accountId}")
    public ResponseEntity<VerificationCode> findByAccountId(@PathVariable Long accountId)throws EmptyResponseException {
       VerificationCode verificationCode = this.verificationCodeService.findByAccountId(accountId);
       return ResponseEntity.status(HttpStatus.OK).body(verificationCode);
    }
}
