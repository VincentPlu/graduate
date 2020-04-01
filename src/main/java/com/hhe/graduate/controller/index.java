package com.hhe.graduate.controller;

import com.hhe.graduate.Services.UserService;
import com.hhe.graduate.bean.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/pages")
public class index {
    String prefix = "pages";

    @Autowired
    @Qualifier("userService")
    private UserService userService;

    @GetMapping("index")
    public String index(ModelMap modelMap){
       return prefix + "/index" ;
    }

    @GetMapping("search")
    public String search(ModelMap modelMap){

        return prefix + "/search" ;
    }

    @GetMapping("search-results")
    public String searchResults(){
        return prefix + "/search-results";
    }
}
