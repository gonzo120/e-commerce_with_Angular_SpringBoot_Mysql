package com.project.jwt.controller;

import com.project.jwt.entity.JwtRequest;
import com.project.jwt.entity.JwtResponse;
import com.project.jwt.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.context.annotation.Lazy;

@RestController
@CrossOrigin
public class JwtController {

    @Autowired
    @Lazy
    private JwtService jwtService;

    @PostMapping({"/authenticate"})
    public JwtResponse createJwtToken(@RequestBody JwtRequest jwtRequest) throws Exception {
        return jwtService.createJwtToken(jwtRequest);
    }
}
