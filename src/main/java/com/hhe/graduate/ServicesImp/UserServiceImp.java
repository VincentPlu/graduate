package com.hhe.graduate.ServicesImp;

import com.hhe.graduate.Services.UserService;
import com.hhe.graduate.bean.User;
import com.hhe.graduate.bean.UserExample;
import com.hhe.graduate.mapper.UserMapper;
import com.hhe.graduate.util.MailUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service("userService")
public class UserServiceImp implements UserService {
    @Autowired
    private UserMapper userMapper;
    @Autowired
    MailUtils mailUtils;


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
        user.setId(UUID.randomUUID().toString());
        user.setUserSex("0");
        user.setUserType("1");
        // 添加唯一激活码
        user.setCode(UUID.randomUUID().toString().replaceAll("-",""));
        //设置账户默认状态 0：未激活
        user.setState(0);
        Date date = new Date();
        //SimpleDateFormat ft = new SimpleDateFormat ("yyyy-MM-dd hh:mm:ss");
        user.setUserCreateTime(date);
        //通过用户填写的邮箱，发送激活邮件
        try {
            mailUtils.sendMail(user.getUserEmail(), user.getCode());
        } catch (Exception e) {
            e.printStackTrace();
        }

        return userMapper.insertone(user);
    }

    @Override
    public int activate(String code) {

        return userMapper.activate(code);
    }

    @Override
    public int updateState(String code) {
        return userMapper.updateState(code);
    }
}
