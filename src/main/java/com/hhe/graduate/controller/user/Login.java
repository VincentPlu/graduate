package com.hhe.graduate.controller.user;

import com.hhe.graduate.bean.User;
import com.hhe.graduate.mapper.UserMapper;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class Login {

    public static final Logger log = LoggerFactory.getLogger(Login.class);

    @GetMapping("login")
    public String login(){
        return "user/login";
    }

    @GetMapping("reg")
    public String login2(){
        return "user/reg";
    }


    @PostMapping("tologin")
    @ResponseBody
    public String tologin(@RequestParam("username")String username, @RequestParam("password")String password, Model model) {
        log.info("登录验证！");
        Subject subject = SecurityUtils.getSubject();

        UsernamePasswordToken token = new UsernamePasswordToken(username, password);

        try {
            subject.login(token);
            log.info("登录验证成功！");
            return "success";
        } catch (UnknownAccountException e) {
            model.addAttribute("msg", "用户名不存在");
            log.info("登录验证，用户名不存在！");
            return "/login";
        } catch (IncorrectCredentialsException e) {
            model.addAttribute("msg", "密码错误");
            log.info("登录验证，密码错误！");
            return "/login";
        }
    }
}
