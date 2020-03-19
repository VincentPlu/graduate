package com.hhe.graduate;

import com.hhe.graduate.Services.IRedisServie;
import com.hhe.graduate.Services.UserService;
import com.hhe.graduate.bean.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class GraduateApplicationTests {
    @Autowired
    IRedisServie redisServie;
    @Autowired
    private UserService userService;
    @Test
    void contextLoads() {
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
