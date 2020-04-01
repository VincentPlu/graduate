package com.hhe.graduate.Services;

import com.hhe.graduate.bean.User;

import java.util.List;

public interface UserService {
    public int login(User user);

    public User selectUser(String username);

    public int insertone(User user);

    public int activate(String code);

    public int updateState(String code);

}
