package com.ecinema.backend.controller;

import java.util.List;
import java.util.Optional;

import javax.naming.directory.InvalidAttributesException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ecinema.backend.exception.EmptyResponseException;
import com.ecinema.backend.exception.UnauthorizedException;
import com.ecinema.backend.input.CheckoutInput;
import com.ecinema.backend.input.LoginInput;
import com.ecinema.backend.input.UserInput;

import com.ecinema.backend.models.User;
import com.ecinema.backend.service.UserService;
import com.ecinema.backend.models.Payment;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.jasypt.encryption.StringEncryptor;

import com.ecinema.backend.repository.UserRepository;

@RestController
@RequestMapping("/api/v1/user")
@CrossOrigin("http://localhost:3000")
public class UserController {
    @Autowired
    @Qualifier("userService")
    private UserService userService;

    @Autowired
    private StringEncryptor ccNumberEncryptor;

    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @GetMapping("/getAllUsers")
    public ResponseEntity<List<User>> getAllUsers() throws EmptyResponseException {
        List<User> users = this.userService.getAllUsers();

        if (users.isEmpty()) {
            throw new EmptyResponseException("There are no users available");
        }

        return ResponseEntity.status(HttpStatus.OK).body(users);
    }
    ////getUsersByFirstName
    @GetMapping("/getByFirstName/{firstName}")
    public ResponseEntity<List<User>> getUsersByFirstName(@PathVariable String firstName) throws EmptyResponseException{
        List<User> users = this.userService.getUsersByFirstName(firstName);
        
        if (users.isEmpty()) {
            throw new EmptyResponseException("There are no users that have that first name");
        }

        return ResponseEntity.status(HttpStatus.OK).body(users);
    }

    ////getUsersByLastName
    @GetMapping("/getByLastName/{lastName}")
    public ResponseEntity<List<User>> getUsersByLastName(@PathVariable String lastName) throws EmptyResponseException{
        List<User> users = this.userService.getUsersByLastName(lastName);
        
        if (users.isEmpty()) {
            throw new EmptyResponseException("There are no users that have that last name");
        }

        return ResponseEntity.status(HttpStatus.OK).body(users);
    }

    //getUsersByPhoneNumber(String phoneNumber)
    @GetMapping("/getByPhoneNumber/{phoneNumber}")
    public ResponseEntity<List<User>> getUsersByPhoneNumber(@PathVariable String phoneNumber) throws EmptyResponseException{
        List<User> users = this.userService.getUsersByPhoneNumber(phoneNumber);
        
        if (users.isEmpty()) {
            throw new EmptyResponseException("There are no users that have that number");
        }

        return ResponseEntity.status(HttpStatus.OK).body(users);
    }
    //getUsersByEmail(String email)
    @GetMapping("/getByEmail/{email}")
    public ResponseEntity<User> getUsersByEmail(@PathVariable String email) throws EmptyResponseException{
        User user = this.userService.getUsersByEmail(email);
        
        if (user == null) {
            throw new EmptyResponseException("There are no users that have that email");
        }

        return ResponseEntity.status(HttpStatus.OK).body(user);
    }

    @GetMapping("/getByAccountId/{accountId}") 
    public ResponseEntity<User> getUsersByAccountId(@PathVariable Long accountId) throws EmptyResponseException{
        User user = this.userService.getUserById(accountId);
        if (user == null) {
            throw new EmptyResponseException("There are no users that have that accountId");
        }

        return ResponseEntity.status(HttpStatus.OK).body(user);
    }
    
    @PostMapping("/create")
    public ResponseEntity<User> createUser(@RequestBody UserInput input) {
        input.setPassword(this.passwordEncoder.encode(input.getPassword()));
        User user = this.userService.createUser(input);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }

    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody LoginInput input) throws EmptyResponseException, UnauthorizedException {

        User user = this.userService.getUsersByEmail(input.getEmail());
        
        if (user == null) {
            throw new EmptyResponseException("No User with that email");
        }
        
        System.out.println(input.getPassword());
        
        boolean samePassword = this.passwordEncoder.matches(input.getPassword(), user.getPassword());

        List<Payment> cards = this.userRepository.findPaymentsByAccountId(user.getAccountId());

        for (Payment card: cards) {
            String decryptedCreditCardNumber = ccNumberEncryptor.decrypt(card.getCardNumber());
            card.setCardNumber(decryptedCreditCardNumber);
        }

        user.setCards(cards);

        if (samePassword) {
            return ResponseEntity.status(HttpStatus.OK).body(user);
        }

        throw new UnauthorizedException("Password does not match");
    }

    @PostMapping("/updatePassword/{accountId}")
    public ResponseEntity<Void> updatePassword(@PathVariable Long accountId, @RequestBody String newPassword) throws EmptyResponseException {

        Optional<User> user = this.userService.findById(accountId);

        if (user.isEmpty()) {
            throw new EmptyResponseException("This account no longer exists");
        }

        User u = user.get();

        String oldPassword = newPassword;
        String ePassword = this.passwordEncoder.encode(oldPassword);
        System.out.println(this.passwordEncoder.matches(oldPassword, ePassword));

        System.out.println(oldPassword);
        System.out.println(ePassword);
        this.userService.updatePassword(u, this.passwordEncoder.encode(newPassword));

        return ResponseEntity.status(HttpStatus.OK).build();
    }
    @PostMapping("/updateUserStatusId/{accountId}")
    public ResponseEntity<?> updateUserStatusId(@PathVariable Long accountId, @RequestBody String userStatus)throws EmptyResponseException {
        Optional<User> userOptional = this.userService.findById(accountId);

        if (userOptional.isEmpty()) {
            throw new EmptyResponseException("update fail");
        }
        int val=Integer.parseInt(userStatus);
        User user = userOptional.get();
        user.setUserStatusId(val);
        this.userService.saveUser(user); // Save the updated user

        return ResponseEntity.status(HttpStatus.OK).body("User status updated successfully.");
    }

    @PostMapping("/createCard/{userId}")
    public ResponseEntity<?> createCard(@PathVariable Long userId, @RequestBody CheckoutInput input) {
        List<Payment> paymentList = this.userService.getPaymentsByAccountId(userId);
        if (paymentList.size() < 3) {
            User user = this.userService.getUserById(userId);
            try {
                this.userService.addCard(user, input);
                this.userService.saveUser(user);
                return ResponseEntity.status(HttpStatus.CREATED).body(user);
            } catch (InvalidAttributesException e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing information");
            }
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Maximum card limit reached. No additional cards can be added.");
        }
    }

    @DeleteMapping("/deleteCard/{userId}/{cardId}")
    public ResponseEntity<?> deleteCard(@PathVariable Long userId, @PathVariable Long cardId) {
        System.out.println("cardid: " + cardId);
        User user = userService.getUserById(userId);
        if (user.getCards().removeIf(card -> card.getCardId().equals(cardId))) {
            userService.saveUser(user);
            List<Payment> cards = this.userRepository.findPaymentsByAccountId(user.getAccountId());;
            for (Payment card : cards) {
                String decryptedCreditCardNumber = ccNumberEncryptor.decrypt(card.getCardNumber());
                card.setCardNumber(decryptedCreditCardNumber);
            }
            user.setCards(cards);
            return ResponseEntity.status(HttpStatus.OK).body(user);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not an existing card");
        }
    }

    @PutMapping("/updateProfile/{accountId}")
    public ResponseEntity<?> updateProfile(@PathVariable Long accountId, @RequestBody UserInput input) {
        User user = this.userService.getUserById(accountId);
        try {
            User tempUser = this.userService.updateUser(user, input);
            List<Payment> cards = this.userRepository.findPaymentsByAccountId(tempUser.getAccountId());;
            for (Payment card: cards) {
                String decryptedCreditCardNumber = ccNumberEncryptor.decrypt(card.getCardNumber());
                card.setCardNumber(decryptedCreditCardNumber);
            }
            tempUser.setCards(cards);
            return ResponseEntity.status(HttpStatus.OK).body(tempUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid user information");
        }
    }

    @GetMapping("/getCardsById/{accountId}")
    public ResponseEntity<List<Payment>> getPaymentsByAccountId(@PathVariable Long accountId) throws EmptyResponseException{
        User user = this.userService.getUserById(accountId);
        List<Payment> paymentList = this.userService.getPaymentsByAccountId(accountId);

        for (Payment card: paymentList) {
            String decryptedCreditCardNumber = ccNumberEncryptor.decrypt(card.getCardNumber());
            card.setCardNumber(decryptedCreditCardNumber);
        }
        user.setCards(paymentList);

        
        if (paymentList.isEmpty()) {
            throw new EmptyResponseException("There are no credit cards that have that accoundId");
        }

        return ResponseEntity.status(HttpStatus.OK).body(paymentList);
    }
    
}
