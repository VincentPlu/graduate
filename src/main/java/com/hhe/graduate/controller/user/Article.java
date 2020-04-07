package com.hhe.graduate.controller.user;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/pages")
public class Article {

    public static final Logger log = LoggerFactory.getLogger(Article.class);

    private String prefix = "/pages";

    @GetMapping("/article")
    public String article() {
        return prefix + "/article";
    }
}
