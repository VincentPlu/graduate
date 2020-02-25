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
        User user = new User();
        user.setId("001");
        user.setUserName("hhe");
        user.setUserPass("123");
        modelMap.put("User",user);
       return prefix + "/index" ;
    }

    @GetMapping("search-results")
    public String searchResults(){
        return prefix + "/search-results";
    }

    /*@PostMapping("login")
    @ResponseBody
    public String login(User user){
        System.out.println(user.getUserLoginname());
        System.out.println(user.getUserPass());
        User users = userService.login(user.getUserName(),user.getUserPass());
        if (users!=null){
            return "登录成功";
        }
        return "我進了這個方法";
    }*/
}
