package com.hhe.graduate.controller.user;

import com.hhe.graduate.Services.UserService;
import com.hhe.graduate.bean.User;
import com.hhe.graduate.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
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
    @Autowired
    private UserService userService;

    /**
     * 用户登录
     * @param loginname
     * @return
     */
    @PostMapping("/selectloginname")
    @ResponseBody
    public String loginname(@RequestParam String loginname) {
       User user = userMapper.selectUser(loginname);
       if (user != null) {
           return "success";
       }
       return "fail";
    }

    /**
     * 用户注册
     * @param loginname
     * @param userpass
     * @param usermail
     * @return
     */
    @PostMapping("/reguer")
    @ResponseBody
    public String reguer(@RequestParam("loginname") String loginname,
                         @RequestParam("userpass") String userpass,
                         @RequestParam("usermail") String usermail) {
        User user = new User();
        user.setUserName(loginname);
        user.setUserLoginname(loginname);
        user.setUserPass(userpass);
        user.setUserEmail(usermail);
        int result = userService.insertone(user);
        if (result > 0) {
            return "success";
        }
        return "fail";
    }

    /**
     * 通过激活码激活账户
     * @param code
     * @return
     */
    @GetMapping("/activate")
    @ResponseBody
    public String activate(@RequestParam("code") String code){
        int result = userService.activate(code);
        if (result > 0) {
            userService.updateState(code);
            return "激活成功";
        }
        return null;
    }
}
