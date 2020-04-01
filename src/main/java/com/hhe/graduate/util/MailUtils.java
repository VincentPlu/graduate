package com.hhe.graduate.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import javax.mail.internet.MimeMessage;

@Component
public class MailUtils {

    @Autowired
    private JavaMailSenderImpl javaMailSender;
    /**
     * @param useremail 接收激活码邮箱
     * @param code   激活码
     */
    public void sendMail(String useremail, String code) throws Exception {

        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper message = new MimeMessageHelper(mimeMessage, true);
        String title = "账号激活邮件";
        String text = "<div align='center'><h1>网站账号激活邮件</h1><h3><br/><a href='http://127.0.0.1:8080/activate?code="+code+"'>点此激活</a></h3></div>";
        message.setSubject(title);
        message.setText(text, true);
        message.setTo(useremail);
        message.setFrom(useremail);

        javaMailSender.send(mimeMessage);

    }
}
