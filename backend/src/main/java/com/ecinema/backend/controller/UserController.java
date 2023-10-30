package com.ecinema.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ecinema.backend.exception.EmptyResponseException;
import com.ecinema.backend.exception.UnauthorizedException;
import com.ecinema.backend.input.LoginInput;
import com.ecinema.backend.input.UserInput;

import com.ecinema.backend.models.User;
import com.ecinema.backend.service.UserService;
import com.ecinema.backend.models.Payment;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@RestController
@RequestMapping("/api/v1/user")
@CrossOrigin("http://localhost:3000")
public class UserController {
    @Autowired
    @Qualifier("userService")
    private UserService userService;

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

    @DeleteMapping("/deleteCard/{userId}/{cardId}")
    public ResponseEntity<?> deleteCard(@PathVariable Long userId, @PathVariable Long cardId) {
        System.out.println("cardid: " + cardId);
        User user = userService.getUserById(userId);
        if (user.getCards().removeIf(card -> card.getCardId().equals(cardId))) {
            userService.saveUser(user);
            return ResponseEntity.status(HttpStatus.OK).body(user);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not an existing card");
        }
    }

    @PutMapping("/updateProfile/{accountId}")
    public ResponseEntity<?> updateProfile(@PathVariable Long accountId, @RequestBody UserInput input) {
        User user = this.userService.getUserById(accountId);
        try {
            return ResponseEntity.status(HttpStatus.OK).body(this.userService.updateUser(user, input));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid user information");
        }
    }
    
}
