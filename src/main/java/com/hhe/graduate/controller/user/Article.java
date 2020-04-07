package com.hhe.graduate.controller.user;
import	java.util.Map;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/pages")
public class Article {

    public static final Logger log = LoggerFactory.getLogger(Article.class);

    private String prefix = "/pages";

    @GetMapping("/article")
    public String article() {
        return prefix + "/article";
    }

    @RequestMapping("/list")
    @ResponseBody
    public String list(@RequestParam ("page")String page, @RequestParam ("limit")String limit, Model model) {
        int startPage =  Integer.parseInt(page);
        int pageSize =  Integer.parseInt(limit);

        //model.addAttribute();
        return "";
    }

}
