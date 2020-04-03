package com.hhe.graduate;

import com.hhe.graduate.Services.IRedisServie;
import com.hhe.graduate.Services.UserService;
import com.hhe.graduate.bean.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;

import javax.mail.internet.MimeMessage;
import java.io.File;

@SpringBootTest
class GraduateApplicationTests {
    @Autowired
    IRedisServie redisServie;
    @Autowired
    private UserService userService;

    @Autowired
    JavaMailSenderImpl javaMailSender;

    @Value("${dragon.serverurl}")
    private String serverurl;

    @Test
    void contextLoads() {
        System.out.println(serverurl);
    }

    @Test
    void redisTest(){
        redisServie.setValue("name","hehao");
        System.out.println(redisServie.getValue("name"));
    }

    @Test
    void sqltest(){
        User user = new User();
        user.setUserName("何浩");
        user.setUserPass("123");
        int result = userService.login(user);
        System.out.println(result);
    }

}
