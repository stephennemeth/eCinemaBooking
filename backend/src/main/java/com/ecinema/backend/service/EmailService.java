package com.ecinema.backend.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.ecinema.backend.models.Promotion;

@Service("emailService")
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
    public void sendPassChangeEmail(String to, String code) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("eCinemaBooking: Request to change password");
        message.setText("Here is the code to change your password: " + code);
        mailSender.send(message);
    }
    public void sendPromotionEmail(String to, Promotion promotion) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("eCinemaBooking: Promotion available!");
        message.setText("Here are the promotion details: \nCode: " + promotion.getPromoCode()+ 
        		"\nOffers you a discount of "+promotion.getDiscount()+
        		"%. This promotion code is valid from "+promotion.getStartDate()+
        		" to "+promotion.getEndDate()+".");
        mailSender.send(message);
    }
}