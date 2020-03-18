package com.hhe.graduate;

import com.hhe.graduate.Services.IRedisServie;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class GraduateApplicationTests {
    @Autowired
    IRedisServie redisServie;
    @Test
    void contextLoads() {
    }

    @Test
    void redisTest(){
        redisServie.setValue("name","hehao");
        System.out.println(redisServie.getValue("name"));
    }
}
