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
        User user = userService.selectUserById("001");
        System.out.println(user.getUserLoginname());
    }
}
