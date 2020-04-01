package com.hhe.graduate.ServicesImp;

import com.hhe.graduate.Services.UserService;
import com.hhe.graduate.bean.User;
import com.hhe.graduate.bean.UserExample;
import com.hhe.graduate.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("userService")
public class UserServiceImp implements UserService {
    @Autowired
    private UserMapper userMapper;

    @Override
    public int login(User user) {
        UserExample userExample = new UserExample();
        UserExample.Criteria criteria = userExample.createCriteria();
        criteria.andUserNameEqualTo(user.getUserName());
        criteria.andUserPassEqualTo(user.getUserPass());
        List<User> list = userMapper.selectByExample(userExample);
        return list.size();
    }

    @Override
    public User selectUser(String username) {
        return userMapper.selectUser(username);
    }

    @Override
    public int insertone(User user) {
        return userMapper.insertone(user);
    }
}
