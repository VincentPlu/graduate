package com.hhe.graduate;

import com.hhe.graduate.Services.IRedisServie;
import com.hhe.graduate.Services.UserService;
import com.hhe.graduate.bean.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
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

    /**
     * 邮件测试代码
     * @throws Exception
     */
    @Test
    public void test2() throws Exception{
        //SimpleMailMessage message = new SimpleMailMessage();
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper message = new MimeMessageHelper(mimeMessage, true);
        String title = "2020届毕业论文答辩通知";
        String text = "<h1>\n" +
                "2020届毕业论文答辩通知\n" +
                "</h1>                    \n" +
                "<span style=\"line-height:150%;font-family:宋体;font-size:16px;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;参与</span><span lang=\"EN-US\" style=\"line-height:150%;font-size:16px;\">2020</span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">届毕业论文答辩的学生请注意，目前毕业论文工作即将进入答辩阶段，有进入实验室做实验的同学将<strong style=\"mso-bidi-font-weight:normal\">《</strong></span><strong style=\"mso-bidi-font-weight:\n" +
                "normal\"><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">附件</span></strong><strong style=\"mso-bidi-font-weight:normal\"><span lang=\"EN-US\" style=\"line-height:150%;font-size:16px;\">4 </span></strong><strong style=\"mso-bidi-font-weight:normal\"><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">毕业论文实验承诺书</span></strong><strong style=\"mso-bidi-font-weight:normal\"><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">》</span></strong><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">给实验室老师签字，方可参加答辩。还没有定稿的同学，仔细通读并按照</span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">《</span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">附件</span><span lang=\"EN-US\" style=\"line-height:150%;font-size:16px;\">2-1 </span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">本科生科学实验和理论研究型课题毕业论文撰写规范</span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">》和《</span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">附件</span><span lang=\"EN-US\" style=\"line-height:150%;font-size:16px;\">2-2 </span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">本科生工程设计型课题毕业设计撰写规范</span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">》</span><span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">，</span></span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">提速完成，并按要求填写好《附件</span><span lang=\"EN-US\" style=\"line-height:150%;font-size:16px;\">6 </span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">毕业论文（设计）工作任务书（学生）》和《附件</span><span lang=\"EN-US\" style=\"line-height:150%;font-size:16px;\">7 </span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">毕业论文（设计）工作进度记录表》。</span></p><p style=\"\n" +
                "mso-para-mso-para-mso-para-.5gd;mso-para-line-height:150%;mso-pagination:widow-orphan;margin:.5gd 0cm \n" +
                "\"><strong style=\"mso-bidi-font-weight:normal\"><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">一、答辩前准备</span></strong><strong style=\"mso-bidi-font-weight:normal\"></strong></p><p style=\"line-height:150%;mso-pagination:widow-orphan\"><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">&nbsp;&nbsp; 每个参加答辩的学生在答辩前应做好以下各项准备：</span></p><p style=\"mso-para-\n" +
                "text-indent:-41px;mso-char-indent-count:-2.57;line-height:150%;mso-pagination:\n" +
                "widow-orphan;tab-stops:list 35px;margin-left:2.0gd;\"><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">&nbsp; （</span><span lang=\"EN-US\" style=\"line-height:150%;font-size:16px;\">1</span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">）已定稿的毕业论文纸版</span><span lang=\"EN-US\" style=\"line-height:150%;font-size:16px;\">4~6</span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">份（份数为答辩小组老师总人数加</span><span lang=\"EN-US\" style=\"line-height:150%;font-size:16px;\">1</span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">，<strong style=\"mso-bidi-font-weight:normal\">包含</strong>论文首页纸和论文部分，<strong style=\"mso-bidi-font-weight:\n" +
                "normal\">包含工作任务书和工作进度表</strong>。）</span></p><p style=\"mso-para-\n" +
                "text-indent:-22px;mso-char-indent-count:-1.4;line-height:150%;mso-pagination:\n" +
                "widow-orphan;tab-stops:list 48px;margin-left:2.0gd;\"><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">&nbsp; （</span><span lang=\"EN-US\" style=\"line-height:150%;font-size:16px;\">2</span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">）环境科学与工程学院学位论文答辩记录</span><span lang=\"EN-US\" style=\"line-height:150%;font-size:16px;\">1</span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">份（见附件</span><span lang=\"EN-US\" style=\"line-height:150%;font-size:16px;\">3</span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">）</span></p><p style=\"mso-para-\n" +
                "text-indent:-22px;mso-char-indent-count:-1.4;line-height:150%;mso-pagination:\n" +
                "widow-orphan;tab-stops:list 48px;margin-left:2.0gd;\"><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">&nbsp; （</span><span lang=\"EN-US\" style=\"line-height:150%;font-size:16px;\">3</span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">）答辩演讲稿（</span><span lang=\"EN-US\" style=\"line-height:150%;font-size:16px;\">PPT</span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">文件）</span><span lang=\"EN-US\" style=\"line-height:150%;font-size:16px;\">1</span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">份，演讲</span><span lang=\"EN-US\" style=\"line-height:150%;font-size:16px;\">7-10</span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">分钟，答辩时间</span><span lang=\"EN-US\" style=\"line-height:150%;font-size:16px;\">5~10</span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">分钟。</span></p><p style=\"mso-para-\n" +
                "text-indent:-22px;mso-char-indent-count:-1.4;line-height:150%;mso-pagination:\n" +
                "widow-orphan;tab-stops:list 48px;margin-left:2.0gd;\"><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">&nbsp; （</span><span lang=\"EN-US\" style=\"line-height:150%;font-size:16px;\">4</span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">）自带一支黑色水笔。</span></p><p style=\"text-indent:32px;mso-char-indent-count:2.0;\n" +
                "line-height:150%;mso-pagination:widow-orphan\"><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">注：请所有参与答辩的同学提前</span><span lang=\"EN-US\" style=\"line-height:150%;font-size:16px;\">20 </span><span lang=\"EN-US\" style=\"line-height:150%;font-size:16px;\">min</span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">到达答辩地点进行抽签决定答辩顺序，将准备好的材料（</span><span lang=\"EN-US\" style=\"line-height:150%;font-size:16px;\">1</span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">）中纸版</span><span lang=\"EN-US\" style=\"line-height:150%;font-size:16px;\">3~5</span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">份（答辩小组老师总人数）交给答辩秘书，并由答辩秘书按答辩顺序交给答辩现场的老师；材料（</span><span lang=\"EN-US\" style=\"line-height:150%;font-size:16px;\">2</span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">）需要在答辩中请答辩秘书填写，并由答辩秘书在“答辩委员会记录人（签字）处<span lang=\"EN-US\">”</span>签字后方可提交给指导教师；材料（</span><span lang=\"EN-US\" style=\"line-height:150%;font-size:16px;\">3</span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">）自行拷贝到答辩教室电脑上；材料（</span><span lang=\"EN-US\" style=\"line-height:150%;font-size:16px;\">4</span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">）自用。</span></p><p style=\"\n" +
                "mso-para-mso-para-mso-para-.5gd;mso-para-line-height:150%;mso-pagination:widow-orphan;margin:.5gd 0cm \n" +
                "\"><strong style=\"mso-bidi-font-weight:normal\"><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">二、答辩时间和地点</span></strong><strong style=\"mso-bidi-font-weight:normal\"></strong></p><div align=\"center\"><table width=\"0\" style=\"width:531px;border-collapse:collapse;border:none;mso-border-alt:solid #000 1px;\n" +
                "mso-yfti-tbllook:480;mso-padding-alt:0cm 7px 0cm 7px;mso-border-insideh:\n" +
                "1px solid #000;mso-border-insidev:1px solid #000\" border=\"1\" cellspacing=\"0\" cellpadding=\"0\"><tbody><tr style=\"mso-yfti-irow:0;mso-yfti-firstrow:yes\"><td width=\"47\" style=\"width:47px;border:solid #000 1px;mso-border-alt:\n" +
                "solid #000 1px;padding:0cm 7px 0cm 7px\"><p style=\"text-align:center;line-height:150%;text-align:center;\"><strong style=\"mso-bidi-font-weight:normal\"><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">序号</span></strong><strong style=\"mso-bidi-font-weight:normal\"></strong></p></td><td width=\"101\" style=\"width:101px;border:solid #000 1px;border-left:\n" +
                "none;mso-border-left-alt:solid #000 1px;mso-border-alt:solid #000 1px;\n" +
                "padding:0cm 7px 0cm 7px\"><p style=\"text-align:center;line-height:150%;text-align:center;\"><strong style=\"mso-bidi-font-weight:normal\"><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">组长</span></strong><strong style=\"mso-bidi-font-weight:normal\"></strong></p></td><td width=\"127\" style=\"width:127px;border:solid #000 1px;border-left:\n" +
                "none;mso-border-left-alt:solid #000 1px;mso-border-alt:solid #000 1px;\n" +
                "padding:0cm 7px 0cm 7px\"><p style=\"text-align:center;line-height:150%;text-align:center;\"><strong style=\"mso-bidi-font-weight:normal\"><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">组员</span></strong><strong style=\"mso-bidi-font-weight:normal\"></strong></p></td><td width=\"154\" style=\"width:154px;border:solid #000 1px;border-left:\n" +
                "none;mso-border-left-alt:solid #000 1px;mso-border-alt:solid #000 1px;\n" +
                "padding:0cm 7px 0cm 7px\"><p style=\"text-align:center;line-height:150%;text-align:center;\"><strong style=\"mso-bidi-font-weight:normal\"><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">答辩时间</span></strong><strong style=\"mso-bidi-font-weight:normal\"></strong></p></td><td width=\"102\" style=\"width:102px;border:solid #000 1px;border-left:\n" +
                "none;mso-border-left-alt:solid #000 1px;mso-border-alt:solid #000 1px;\n" +
                "padding:0cm 7px 0cm 7px\"><p style=\"text-align:center;line-height:150%;text-align:center;\"><strong style=\"mso-bidi-font-weight:normal\"><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">答辩地点</span></strong><strong style=\"mso-bidi-font-weight:normal\"></strong></p></td></tr><tr style=\"mso-yfti-irow:1\"><td width=\"47\" style=\"width:47px;border:solid #000 1px;border-top:\n" +
                "none;mso-border-top-alt:solid #000 1px;mso-border-alt:solid #000 1px;\n" +
                "padding:0cm 7px 0cm 7px\"><p style=\"text-align:center;line-height:150%;text-align:center;\"><span lang=\"EN-US\" style=\"line-height:150%;font-size:16px;\">1</span></p></td><td width=\"101\" style=\"width:101px;border-top:none;border-left:none;\n" +
                "border-bottom:solid #000 1px;border-right:solid #000 1px;\n" +
                "mso-border-top-alt:solid #000 1px;mso-border-left-alt:solid #000 1px;\n" +
                "mso-border-alt:solid #000 1px;padding:0cm 7px 0cm 7px\"><p style=\"text-align:center;line-height:150%;text-align:center;\"><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">王鸿辉</span></p></td><td width=\"127\" style=\"width:127px;border-top:none;border-left:none;\n" +
                "border-bottom:solid #000 1px;border-right:solid #000 1px;\n" +
                "mso-border-top-alt:solid #000 1px;mso-border-left-alt:solid #000 1px;\n" +
                "mso-border-alt:solid #000 1px;padding:0cm 7px 0cm 7px\"><p style=\"text-align:center;line-height:150%;text-align:center;\"><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">陈霞明</span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">、</span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">王秀丽（由周亮协助）</span></p></td><td width=\"154\" style=\"width:154px;border-top:none;border-left:none;\n" +
                "border-bottom:solid #000 1px;border-right:solid #000 1px;\n" +
                "mso-border-top-alt:solid #000 1px;mso-border-left-alt:solid #000 1px;\n" +
                "mso-border-alt:solid #000 1px;padding:0cm 7px 0cm 7px\"><p style=\"text-align:center;line-height:27px;\n" +
                "mso-line-height-rule:exactly;text-align:center;\"><span lang=\"EN-US\" style=\"font-size:16px;\">2020</span><span style=\"font-family:宋体;font-size:16px;\">年</span><span lang=\"EN-US\" style=\"font-size:16px;\">4</span><span style=\"font-family:宋体;font-size:16px;\">月</span><span lang=\"EN-US\" style=\"font-size:16px;\">24</span><span style=\"font-family:宋体;font-size:16px;\">日</span></p><p style=\"text-align:center;line-height:27px;\n" +
                "mso-line-height-rule:exactly;text-align:center;\"><span style=\"font-family:宋体;font-size:16px;\">下午</span><span lang=\"EN-US\" style=\"font-size:16px;\">15:00</span><span style=\"font-family:宋体;font-size:16px;\">始</span></p></td><td width=\"102\" style=\"width:102px;border-top:none;border-left:none;\n" +
                "border-bottom:solid #000 1px;border-right:solid #000 1px;\n" +
                "mso-border-top-alt:solid #000 1px;mso-border-left-alt:solid #000 1px;\n" +
                "mso-border-alt:solid #000 1px;padding:0cm 7px 0cm 7px\"><p style=\"text-align:center;line-height:27px;\n" +
                "mso-line-height-rule:exactly;text-align:center;\"><span style=\"font-family:宋体;font-size:16px;\">生化主</span><span lang=\"EN-US\" style=\"font-size:16px;\">#605</span></p></td></tr><tr style=\"mso-yfti-irow:2\"><td width=\"47\" style=\"width:47px;border:solid #000 1px;border-top:\n" +
                "none;mso-border-top-alt:solid #000 1px;mso-border-alt:solid #000 1px;\n" +
                "padding:0cm 7px 0cm 7px\"><p style=\"text-align:center;line-height:150%;text-align:center;\"><span lang=\"EN-US\" style=\"line-height:150%;font-size:16px;\">2</span></p></td><td width=\"101\" style=\"width:101px;border-top:none;border-left:none;\n" +
                "border-bottom:solid #000 1px;border-right:solid #000 1px;\n" +
                "mso-border-top-alt:solid #000 1px;mso-border-left-alt:solid #000 1px;\n" +
                "mso-border-alt:solid #000 1px;padding:0cm 7px 0cm 7px\"><p style=\"text-align:center;line-height:150%;text-align:center;\"><st1:personname productid=\"黄金阳\" w:st=\"on\"><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">黄金阳</span></st1:personname></p></td><td width=\"127\" style=\"width:127px;border-top:none;border-left:none;\n" +
                "border-bottom:solid #000 1px;border-right:solid #000 1px;\n" +
                "mso-border-top-alt:solid #000 1px;mso-border-left-alt:solid #000 1px;\n" +
                "mso-border-alt:solid #000 1px;padding:0cm 7px 0cm 7px\"><p style=\"text-align:center;line-height:150%;text-align:center;\"><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">桂洪杰、李恒</span></p></td><td width=\"154\" style=\"width:154px;border-top:none;border-left:none;\n" +
                "border-bottom:solid #000 1px;border-right:solid #000 1px;\n" +
                "mso-border-top-alt:solid #000 1px;mso-border-left-alt:solid #000 1px;\n" +
                "mso-border-alt:solid #000 1px;padding:0cm 7px 0cm 7px\"><p style=\"text-align:center;line-height:27px;\n" +
                "mso-line-height-rule:exactly;text-align:center;\"><span lang=\"EN-US\" style=\"font-size:16px;\">2020</span><span style=\"font-family:宋体;font-size:16px;\">年</span><span lang=\"EN-US\" style=\"font-size:16px;\">4</span><span style=\"font-family:宋体;font-size:16px;\">月</span><span lang=\"EN-US\" style=\"font-size:16px;\">16</span><span style=\"font-family:宋体;font-size:16px;\">日</span></p><p style=\"text-align:center;line-height:27px;\n" +
                "mso-line-height-rule:exactly;text-align:center;\"><span style=\"font-family:宋体;font-size:16px;\">中午</span><span lang=\"EN-US\" style=\"font-size:16px;\">13:00</span><span style=\"font-family:宋体;font-size:16px;\">始</span></p></td><td width=\"102\" style=\"width:102px;border-top:none;border-left:none;\n" +
                "border-bottom:solid #000 1px;border-right:solid #000 1px;\n" +
                "mso-border-top-alt:solid #000 1px;mso-border-left-alt:solid #000 1px;\n" +
                "mso-border-alt:solid #000 1px;padding:0cm 7px 0cm 7px\"><p style=\"text-align:center;line-height:27px;\n" +
                "mso-line-height-rule:exactly;text-align:center;\"><span style=\"font-family:宋体;font-size:16px;\">生化主</span><span lang=\"EN-US\" style=\"font-size:16px;\">#605</span></p></td></tr><tr style=\"mso-yfti-irow:3\"><td width=\"47\" style=\"width:47px;border:solid #000 1px;border-top:\n" +
                "none;mso-border-top-alt:solid #000 1px;mso-border-alt:solid #000 1px;\n" +
                "padding:0cm 7px 0cm 7px\"><p style=\"text-align:center;line-height:150%;text-align:center;\"><span lang=\"EN-US\" style=\"line-height:150%;font-size:16px;\">3</span></p></td><td width=\"101\" style=\"width:101px;border-top:none;border-left:none;\n" +
                "border-bottom:solid #000 1px;border-right:solid #000 1px;\n" +
                "mso-border-top-alt:solid #000 1px;mso-border-left-alt:solid #000 1px;\n" +
                "mso-border-alt:solid #000 1px;padding:0cm 7px 0cm 7px\"><p style=\"text-align:center;line-height:150%;text-align:center;\"><st1:personname productid=\"蔡丽云\" w:st=\"on\"><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">蔡丽云</span></st1:personname></p></td><td width=\"127\" style=\"width:127px;border-top:none;border-left:none;\n" +
                "border-bottom:solid #000 1px;border-right:solid #000 1px;\n" +
                "mso-border-top-alt:solid #000 1px;mso-border-left-alt:solid #000 1px;\n" +
                "mso-border-alt:solid #000 1px;padding:0cm 7px 0cm 7px\"><p style=\"text-align:center;line-height:150%;text-align:center;\"><st1:personname productid=\"沈程程\" w:st=\"on\"><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">沈程程</span></st1:personname><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">、付骐宾</span></p></td><td width=\"154\" style=\"width:154px;border-top:none;border-left:none;\n" +
                "border-bottom:solid #000 1px;border-right:solid #000 1px;\n" +
                "mso-border-top-alt:solid #000 1px;mso-border-left-alt:solid #000 1px;\n" +
                "mso-border-alt:solid #000 1px;padding:0cm 7px 0cm 7px\"><p style=\"text-align:center;line-height:27px;\n" +
                "mso-line-height-rule:exactly;text-align:center;\"><span lang=\"EN-US\" style=\"font-size:16px;\">2020</span><span style=\"font-family:宋体;font-size:16px;\">年</span><span lang=\"EN-US\" style=\"font-size:16px;\">4</span><span style=\"font-family:宋体;font-size:16px;\">月</span><span lang=\"EN-US\" style=\"font-size:16px;\">15</span><span style=\"font-family:宋体;font-size:16px;\">日</span></p><p style=\"text-align:center;line-height:27px;\n" +
                "mso-line-height-rule:exactly;text-align:center;\"><span style=\"font-family:宋体;font-size:16px;\">中午</span><span lang=\"EN-US\" style=\"font-size:16px;\">12:30</span><span style=\"font-family:宋体;font-size:16px;\">始</span></p></td><td width=\"102\" style=\"width:102px;border-top:none;border-left:none;\n" +
                "border-bottom:solid #000 1px;border-right:solid #000 1px;\n" +
                "mso-border-top-alt:solid #000 1px;mso-border-left-alt:solid #000 1px;\n" +
                "mso-border-alt:solid #000 1px;padding:0cm 7px 0cm 7px\"><p style=\"text-align:center;line-height:27px;\n" +
                "mso-line-height-rule:exactly;text-align:center;\"><span style=\"font-family:宋体;font-size:16px;\">生化主</span><span lang=\"EN-US\" style=\"font-size:16px;\">#501</span></p></td></tr><tr style=\"mso-yfti-irow:4\"><td width=\"47\" style=\"width:47px;border:solid #000 1px;border-top:\n" +
                "none;mso-border-top-alt:solid #000 1px;mso-border-alt:solid #000 1px;\n" +
                "padding:0cm 7px 0cm 7px\"><p style=\"text-align:center;line-height:150%;text-align:center;\"><span lang=\"EN-US\" style=\"line-height:150%;font-size:16px;\">4</span></p></td><td width=\"101\" style=\"width:101px;border-top:none;border-left:none;\n" +
                "border-bottom:solid #000 1px;border-right:solid #000 1px;\n" +
                "mso-border-top-alt:solid #000 1px;mso-border-left-alt:solid #000 1px;\n" +
                "mso-border-alt:solid #000 1px;padding:0cm 7px 0cm 7px\"><p style=\"text-align:center;line-height:150%;text-align:center;\"><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">金亮</span></p></td><td width=\"127\" style=\"width:127px;border-top:none;border-left:none;\n" +
                "border-bottom:solid #000 1px;border-right:solid #000 1px;\n" +
                "mso-border-top-alt:solid #000 1px;mso-border-left-alt:solid #000 1px;\n" +
                "mso-border-alt:solid #000 1px;padding:0cm 7px 0cm 7px\"><p style=\"text-align:center;line-height:150%;text-align:center;\"><st1:personname productid=\"林建荣\" w:st=\"on\"><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">林建荣</span></st1:personname><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">、查晓松、</span></p><p style=\"text-align:center;line-height:150%;text-align:center;\"><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">张帆、林昌健</span></p></td><td width=\"154\" style=\"width:154px;border-top:none;border-left:none;\n" +
                "border-bottom:solid #000 1px;border-right:solid #000 1px;\n" +
                "mso-border-top-alt:solid #000 1px;mso-border-left-alt:solid #000 1px;\n" +
                "mso-border-alt:solid #000 1px;padding:0cm 7px 0cm 7px\"><p style=\"text-align:center;line-height:27px;\n" +
                "mso-line-height-rule:exactly;text-align:center;\"><span lang=\"EN-US\" style=\"font-size:16px;\">2020</span><span style=\"font-family:宋体;font-size:16px;\">年</span><span lang=\"EN-US\" style=\"font-size:16px;\">4</span><span style=\"font-family:宋体;font-size:16px;\">月</span><span lang=\"EN-US\" style=\"font-size:16px;\">19</span><span style=\"font-family:宋体;font-size:16px;\">日</span></p><p style=\"text-align:center;line-height:27px;\n" +
                "mso-line-height-rule:exactly;text-align:center;\"><span style=\"font-family:宋体;font-size:16px;\">上午</span><span lang=\"EN-US\" style=\"font-size:16px;\">9:00</span><span style=\"font-family:宋体;font-size:16px;\">始</span></p></td><td width=\"102\" style=\"width:102px;border-top:none;border-left:none;\n" +
                "border-bottom:solid #000 1px;border-right:solid #000 1px;\n" +
                "mso-border-top-alt:solid #000 1px;mso-border-left-alt:solid #000 1px;\n" +
                "mso-border-alt:solid #000 1px;padding:0cm 7px 0cm 7px\"><p style=\"text-align:center;line-height:27px;\n" +
                "mso-line-height-rule:exactly;text-align:center;\"><span style=\"font-family:宋体;font-size:16px;\">生化</span><span lang=\"EN-US\" style=\"font-size:16px;\">C#501</span></p></td></tr><tr style=\"mso-yfti-irow:5\"><td width=\"47\" style=\"width:47px;border:solid #000 1px;border-top:\n" +
                "none;mso-border-top-alt:solid #000 1px;mso-border-alt:solid #000 1px;\n" +
                "padding:0cm 7px 0cm 7px\"><p style=\"text-align:center;line-height:150%;text-align:center;\"><span lang=\"EN-US\" style=\"line-height:150%;font-size:16px;\">5</span></p></td><td width=\"101\" style=\"width:101px;border-top:none;border-left:none;\n" +
                "border-bottom:solid #000 1px;border-right:solid #000 1px;\n" +
                "mso-border-top-alt:solid #000 1px;mso-border-left-alt:solid #000 1px;\n" +
                "mso-border-alt:solid #000 1px;padding:0cm 7px 0cm 7px\"><p style=\"text-align:center;line-height:150%;text-align:center;\"><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">刘兴强</span></p></td><td width=\"127\" style=\"width:127px;border-top:none;border-left:none;\n" +
                "border-bottom:solid #000 1px;border-right:solid #000 1px;\n" +
                "mso-border-top-alt:solid #000 1px;mso-border-left-alt:solid #000 1px;\n" +
                "mso-border-alt:solid #000 1px;padding:0cm 7px 0cm 7px\"><p style=\"text-align:center;line-height:150%;text-align:center;\"><st1:personname productid=\"廖颖敏\" w:st=\"on\"><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">廖颖敏</span></st1:personname><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">、张静</span></p></td><td width=\"154\" style=\"width:154px;border-top:none;border-left:none;\n" +
                "border-bottom:solid #000 1px;border-right:solid #000 1px;\n" +
                "mso-border-top-alt:solid #000 1px;mso-border-left-alt:solid #000 1px;\n" +
                "mso-border-alt:solid #000 1px;padding:0cm 7px 0cm 7px\"><p style=\"text-align:center;line-height:27px;\n" +
                "mso-line-height-rule:exactly;text-align:center;\"><span lang=\"EN-US\" style=\"font-size:16px;\">2020</span><span style=\"font-family:宋体;font-size:16px;\">年</span><span lang=\"EN-US\" style=\"font-size:16px;\">4</span><span style=\"font-family:宋体;font-size:16px;\">月</span><span lang=\"EN-US\" style=\"font-size:16px;\">23</span><span style=\"font-family:宋体;font-size:16px;\">日</span></p><p style=\"text-align:center;line-height:27px;\n" +
                "mso-line-height-rule:exactly;text-align:center;\"><span style=\"font-family:宋体;font-size:16px;\">上午</span><span lang=\"EN-US\" style=\"font-size:16px;\">9:00</span><span style=\"font-family:宋体;font-size:16px;\">始</span></p></td><td width=\"102\" style=\"width:102px;border-top:none;border-left:none;\n" +
                "border-bottom:solid #000 1px;border-right:solid #000 1px;\n" +
                "mso-border-top-alt:solid #000 1px;mso-border-left-alt:solid #000 1px;\n" +
                "mso-border-alt:solid #000 1px;padding:0cm 7px 0cm 7px\"><p style=\"text-align:center;line-height:27px;\n" +
                "mso-line-height-rule:exactly;text-align:center;\"><span style=\"font-family:宋体;font-size:16px;\">生化主</span><span lang=\"EN-US\" style=\"font-size:16px;\">#603</span></p></td></tr><tr style=\"mso-yfti-irow:6\"><td width=\"47\" style=\"width:47px;border:solid #000 1px;border-top:\n" +
                "none;mso-border-top-alt:solid #000 1px;mso-border-alt:solid #000 1px;\n" +
                "padding:0cm 7px 0cm 7px\"><p style=\"text-align:center;line-height:150%;text-align:center;\"><span lang=\"EN-US\" style=\"line-height:150%;font-size:16px;\">6</span></p></td><td width=\"101\" style=\"width:101px;border-top:none;border-left:none;\n" +
                "border-bottom:solid #000 1px;border-right:solid #000 1px;\n" +
                "mso-border-top-alt:solid #000 1px;mso-border-left-alt:solid #000 1px;\n" +
                "mso-border-alt:solid #000 1px;padding:0cm 7px 0cm 7px\"><p style=\"text-align:center;line-height:150%;text-align:center;\"><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">孙鲁闽</span></p></td><td width=\"127\" style=\"width:127px;border-top:none;border-left:none;\n" +
                "border-bottom:solid #000 1px;border-right:solid #000 1px;\n" +
                "mso-border-top-alt:solid #000 1px;mso-border-left-alt:solid #000 1px;\n" +
                "mso-border-alt:solid #000 1px;padding:0cm 7px 0cm 7px\"><p style=\"text-align:center;line-height:150%;text-align:center;\"><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">周亮、马嫱</span></p></td><td width=\"154\" style=\"width:154px;border-top:none;border-left:none;\n" +
                "border-bottom:solid #000 1px;border-right:solid #000 1px;\n" +
                "mso-border-top-alt:solid #000 1px;mso-border-left-alt:solid #000 1px;\n" +
                "mso-border-alt:solid #000 1px;padding:0cm 7px 0cm 7px\"><p style=\"text-align:center;line-height:27px;\n" +
                "mso-line-height-rule:exactly;text-align:center;\"><span lang=\"EN-US\" style=\"font-size:16px;\">2020</span><span style=\"font-family:宋体;font-size:16px;\">年</span><span lang=\"EN-US\" style=\"font-size:16px;\">4</span><span style=\"font-family:宋体;font-size:16px;\">月</span><span lang=\"EN-US\" style=\"font-size:16px;\">11</span><span style=\"font-family:宋体;font-size:16px;\">日</span></p><p style=\"text-align:center;line-height:27px;\n" +
                "mso-line-height-rule:exactly;text-align:center;\"><span style=\"font-family:宋体;font-size:16px;\">上午</span><span lang=\"EN-US\" style=\"font-size:16px;\">9:00</span><span style=\"font-family:宋体;font-size:16px;\">始</span></p></td><td width=\"102\" style=\"width:102px;border-top:none;border-left:none;\n" +
                "border-bottom:solid #000 1px;border-right:solid #000 1px;\n" +
                "mso-border-top-alt:solid #000 1px;mso-border-left-alt:solid #000 1px;\n" +
                "mso-border-alt:solid #000 1px;padding:0cm 7px 0cm 7px\"><p style=\"text-align:center;line-height:27px;\n" +
                "mso-line-height-rule:exactly;text-align:center;\"><span style=\"font-family:宋体;font-size:16px;\">生化</span><span lang=\"EN-US\" style=\"font-size:16px;\">C#501</span></p></td></tr><tr style=\"mso-yfti-irow:7;mso-yfti-lastrow:yes\"><td width=\"47\" style=\"width:47px;border:solid #000 1px;border-top:\n" +
                "none;mso-border-top-alt:solid #000 1px;mso-border-alt:solid #000 1px;\n" +
                "padding:0cm 7px 0cm 7px\"><p style=\"text-align:center;line-height:150%;text-align:center;\"><span lang=\"EN-US\" style=\"line-height:150%;font-size:16px;\">7</span></p></td><td width=\"101\" style=\"width:101px;border-top:none;border-left:none;\n" +
                "border-bottom:solid #000 1px;border-right:solid #000 1px;\n" +
                "mso-border-top-alt:solid #000 1px;mso-border-left-alt:solid #000 1px;\n" +
                "mso-border-alt:solid #000 1px;padding:0cm 7px 0cm 7px\"><p style=\"text-align:center;line-height:150%;text-align:center;\"><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">周细平</span></p></td><td width=\"127\" style=\"width:127px;border-top:none;border-left:none;\n" +
                "border-bottom:solid #000 1px;border-right:solid #000 1px;\n" +
                "mso-border-top-alt:solid #000 1px;mso-border-left-alt:solid #000 1px;\n" +
                "mso-border-alt:solid #000 1px;padding:0cm 7px 0cm 7px\"><p style=\"text-align:center;line-height:150%;text-align:center;\"><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">李莹、张勇</span></p></td><td width=\"154\" style=\"width:154px;border-top:none;border-left:none;\n" +
                "border-bottom:solid #000 1px;border-right:solid #000 1px;\n" +
                "mso-border-top-alt:solid #000 1px;mso-border-left-alt:solid #000 1px;\n" +
                "mso-border-alt:solid #000 1px;padding:0cm 7px 0cm 7px\"><p style=\"text-align:center;line-height:27px;\n" +
                "mso-line-height-rule:exactly;text-align:center;\"><span lang=\"EN-US\" style=\"font-size:16px;\">2020</span><span style=\"font-family:宋体;font-size:16px;\">年</span><span lang=\"EN-US\" style=\"font-size:16px;\">4</span><span style=\"font-family:宋体;font-size:16px;\">月</span><span lang=\"EN-US\" style=\"font-size:16px;\">22</span><span style=\"font-family:宋体;font-size:16px;\">日</span></p><p style=\"text-align:center;line-height:27px;\n" +
                "mso-line-height-rule:exactly;text-align:center;\"><span style=\"font-family:宋体;font-size:16px;\">下午</span><span lang=\"EN-US\" style=\"font-size:16px;\">14:30</span><span style=\"font-family:宋体;font-size:16px;\">始</span></p></td><td width=\"102\" style=\"width:102px;border-top:none;border-left:none;\n" +
                "border-bottom:solid #000 1px;border-right:solid #000 1px;\n" +
                "mso-border-top-alt:solid #000 1px;mso-border-left-alt:solid #000 1px;\n" +
                "mso-border-alt:solid #000 1px;padding:0cm 7px 0cm 7px\"><p style=\"text-align:center;line-height:27px;\n" +
                "mso-line-height-rule:exactly;text-align:center;\"><span style=\"font-family:宋体;font-size:16px;\">生化主</span><span lang=\"EN-US\" style=\"font-size:16px;\">#605</span></p></td></tr></tbody></table></div><p style=\"\n" +
                "mso-para-mso-para-mso-para-.5gd;mso-para-line-height:150%;mso-pagination:widow-orphan;margin:.5gd 0cm \n" +
                "\"><strong style=\"mso-bidi-font-weight:normal\"></strong><strong style=\"mso-bidi-font-weight:\n" +
                "normal\"><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">三、答辩资料的提交</span></strong><strong style=\"mso-bidi-font-weight:normal\"></strong></p><p style=\"text-indent:31px;mso-char-indent-count:1.96;\n" +
                "line-height:150%;mso-pagination:widow-orphan\"><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">答辩完毕后，学生</span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">需在</span><span lang=\"EN-US\" style=\"line-height:150%;font-size:16px;\">2020</span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">年</span><span lang=\"EN-US\" style=\"line-height:150%;font-size:16px;\">5</span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">月</span><span lang=\"EN-US\" style=\"line-height:150%;font-size:16px;\">8</span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">日</span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">前</span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">整理并提交以下材料：</span></p><p style=\"mso-para-\n" +
                "text-indent:-36px;mso-char-indent-count:-2.26;line-height:150%;mso-pagination:\n" +
                "widow-orphan;margin-left:2.0gd;\"><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">&nbsp; （</span><span lang=\"EN-US\" style=\"line-height:150%;font-size:16px;\">1</span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">）按照《<span style=\"mso-bidi-font-weight:bold\">附件</span></span><span lang=\"EN-US\" style=\"line-height:150%;font-size:16px;\">5 </span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">毕业论文（设计）相关资料装订要求</span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">》将毕业论文（<strong style=\"mso-bidi-font-weight:\n" +
                "normal\"><span style=\"text-decoration:underline;\">答辩后再次修改</span></strong>）纸版</span><span lang=\"EN-US\" style=\"line-height:150%;font-size:16px;\">1</span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">份（含完整相关的过程材料、手写签名，日期根据《附件</span><span lang=\"EN-US\" style=\"line-height:150%;font-size:16px;\">2020</span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">届毕业论文（设计）进度安排》填写，注意事项详见《附件</span><span lang=\"EN-US\" style=\"line-height:150%;font-size:16px;\">8 </span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">毕业论文（设计）工作进度记录表填写注意事项》）、电子版</span><span lang=\"EN-US\" style=\"line-height:150%;font-size:16px;\">1</span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">份（命名为“</span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">学号</span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">姓名</span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">论文主标题</span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">”），交到自己的指导教师处，经审核无误后方可。</span></p><p style=\"mso-para-\n" +
                "text-indent:-22px;mso-char-indent-count:-1.4;line-height:150%;mso-pagination:\n" +
                "widow-orphan;tab-stops:list 48px;margin-left:2.0gd;\"><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">&nbsp; （</span><span lang=\"EN-US\" style=\"line-height:150%;font-size:16px;\">2</span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">）填写好的《附件</span><span lang=\"EN-US\" style=\"line-height:150%;font-size:16px;\">3 </span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">环境科学与工程学院学位论文答辩记录》纸版</span><span lang=\"EN-US\" style=\"line-height:150%;font-size:16px;\">1</span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">份。</span></p><p style=\"mso-para-\n" +
                "text-indent:-22px;mso-char-indent-count:-1.4;line-height:150%;mso-pagination:\n" +
                "widow-orphan;tab-stops:list 48px;margin-left:2.0gd;\"><span style=\"line-height:150%;font-family:宋体;font-size:16px;\"><br></span></p><p style=\"mso-para-\n" +
                "text-indent:-22px;mso-char-indent-count:-1.4;line-height:150%;mso-pagination:\n" +
                "widow-orphan;tab-stops:list 48px;margin-left:2.0gd;\"><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">&nbsp;&nbsp;</span></p><p style=\"line-height:150%;mso-pagination:widow-orphan\">&nbsp;&nbsp;</p><p style=\"line-height:150%;mso-pagination:widow-orphan\">&nbsp;&nbsp;</p><p style=\"text-align:right;line-height:150%;\n" +
                "mso-pagination:widow-orphan;text-align:right;\"><span lang=\"EN-US\" style=\"line-height:150%;font-size:16px;\">2020</span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">届毕业论文（设计）答辩委员会</span></p><p style=\"text-align:right;line-height:150%;\n" +
                "mso-pagination:widow-orphan;text-align:right;\"><span lang=\"EN-US\" style=\"line-height:150%;font-size:16px;\">2020</span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">年</span><span lang=\"EN-US\" style=\"line-height:150%;font-size:16px;\">4</span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">月</span><span lang=\"EN-US\" style=\"line-height:150%;font-size:16px;\">4</span><span style=\"line-height:150%;font-family:宋体;font-size:16px;\">日</span></p><p><br></p></div></div>\n" +
                "                </div>\n" +
                "            </div>";
        message.setSubject(title);
        message.setText(text, true);
        message.setTo("hhefox2@foxmail.com");
        message.setFrom("hhefox2@foxmail.com");

        javaMailSender.send(mimeMessage);
    }

}
