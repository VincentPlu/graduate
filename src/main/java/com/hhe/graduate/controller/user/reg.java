package com.hhe.graduate.controller.user;

import com.hhe.graduate.bean.User;
import com.hhe.graduate.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

@Controller
public class reg {
    @Autowired
    private UserMapper userMapper;

    @PostMapping("/selectloginname")
    @ResponseBody
    public String loginname(@RequestParam String loginname) {
       User user = userMapper.selectUser(loginname);
       if (user != null) {
           return "success";
       }
       return "fail";
    }

    @PostMapping("/reguer")
    @ResponseBody
    public String reguer(@RequestParam("loginname") String loginname, @RequestParam("userpass") String userpass) {
        User user = new User();
        user.setId(UUID.randomUUID().toString());
        user.setUserName(loginname);
        user.setUserLoginname(loginname);
        user.setUserSex("0");
        user.setUserType("1");
        user.setUserPass(userpass);
        Date date = new Date();
        //SimpleDateFormat ft = new SimpleDateFormat ("yyyy-MM-dd hh:mm:ss");
        user.setUserCreateTime(date);
        int result = userMapper.insertone(user);
        if (result > 0) {
            return "success";
        }
        return "fail";
    }
}
