package com.ecinema.backend.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.List;

import com.ecinema.backend.enums.CodeType;
import com.ecinema.backend.input.VerificationCodeInput;
import com.ecinema.backend.models.VerificationCode;
import com.ecinema.backend.repository.VerificationCodeRepository;


@Service("verificationCodeService")
public class VerificationCodeService {
    @Autowired
    @Qualifier("verificationCodeRepository")
    private VerificationCodeRepository verificationCodeRepository;

    public VerificationCode createRegCode(VerificationCodeInput input){
        VerificationCode verificationCode = new VerificationCode();
        verificationCode.setCode(generateRandom4DigitCode());
        verificationCode.setCodeType(CodeType.REGISTER.ordinal());
        verificationCode.setAccountId(input.getAccountId());
        return this.verificationCodeRepository.save(verificationCode);
    }
    public VerificationCode createPswCode(VerificationCodeInput input){
        VerificationCode verificationCode = new VerificationCode();
        verificationCode.setCode(generateRandom4DigitCode());
        verificationCode.setCodeType(CodeType.FORGOTPASS.ordinal());
        verificationCode.setAccountId(input.getAccountId());
       return this.verificationCodeRepository.save(verificationCode);
    }
    private String generateRandom4DigitCode() {
        SecureRandom secureRandom = new SecureRandom();
        int code = secureRandom.nextInt(9000) + 1000; // Generate a 4-digit random number
        return String.valueOf(code);
    }
    public List<VerificationCode>getAllCodes(){
        return this.verificationCodeRepository.findAll();
    }
    public VerificationCode findByAccountId(Long accountId){
        return this.verificationCodeRepository.findByAccountId(accountId);
    }
}