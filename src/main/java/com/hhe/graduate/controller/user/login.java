package com.hhe.graduate.controller.user;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class login {
    @GetMapping("/login")
    public String login(){
        return "user/login";
    }

    @GetMapping("/reg")
    public String login2(){
        return "user/reg";
    }

    @GetMapping("/findPass")
    public String findPass(){
        return "user/findPass";
    }
}
