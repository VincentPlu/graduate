package com.hhe.graduate.controller.user;

import com.hhe.graduate.Services.UserService;
import com.hhe.graduate.bean.User;
import com.hhe.graduate.mapper.UserMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import javax.servlet.http.HttpServletRequest;
import java.net.InetAddress;

@Controller
public class reg {

    public static final Logger log = LoggerFactory.getLogger(reg.class);


    @Autowired
    private UserMapper userMapper;
    @Autowired
    private UserService userService;

    @Value("${dragon.serverurl}")
    private String serverurl;

    /**
     * 用户登录
     * @param loginname
     * @return
     */
    @PostMapping("/selectloginname")
    @ResponseBody
    public String loginname(@RequestParam String loginname) {
       User user = userMapper.selectUser(loginname);
       log.info("用户是否存在校验！");
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
        /*try {
            InetAddress address = InetAddress.getLocalHost();//获取的是本地的IP地址
            String serviceIp = address.getHostAddress();//192.168.0.121
            //String serviceIp = request.getLocalAddr();
            Integer servicePort= request.getLocalPort();
            if (serviceIp.equals("0:0:0:0:0:0:0:1")) {
                serviceIp = "127.0.0.1";
            }
            String url = serviceIp+":"+servicePort.toString();
            int result = userService.insertone(user, url);
            if (result > 0) {
                log.info("用户注册成功！");
                return "success";
            }
        } catch (Exception e) {
            e.printStackTrace();
        }*/

        int result = userService.insertone(user, serverurl);
        if (result > 0) {
            log.info("用户注册成功！");
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
            log.info("用户激活成功！");
            userService.updateState(code);
            return "激活成功";
        }
        return null;
    }
}
