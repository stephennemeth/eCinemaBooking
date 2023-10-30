package com.ecinema.backend.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendConfEmail(String to,String code) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Thank you for Registering");
        message.setText("We appreciate you registering if this was not you ignore. your code is "+code);
        mailSender.send(message);
    }

    public void sendPassChangeEmail(String to) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Password Change");
        message.setText("Your password was successfully changed");
        mailSender.send(message);
    }
}