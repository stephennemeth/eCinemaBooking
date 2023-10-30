package com.ecinema.backend.controller;

import com.ecinema.backend.service.EmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/mail")
@CrossOrigin("http://localhost:3000")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/sendconf/{mail}")
    public String sendConfEmail(@PathVariable String mail,@RequestBody String code){
        emailService.sendConfEmail(mail,code);
        return "Successfully sent the mail";
    }
    @PostMapping("/sendpswchng/{mail}")
    public String sendPassChangeEmail(@PathVariable String mail, @RequestBody String code){
        emailService.sendPassChangeEmail(mail, code);
        return "Successfully sent the mail";
    }

}
