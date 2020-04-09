package com.hhe.graduate.controller.user;
import	java.util.List;
import	java.util.Map;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.hhe.graduate.Services.IArticleNewsService;
import com.hhe.graduate.ServicesImp.ArticleNewsServiceImpl;
import com.hhe.graduate.bean.ArticleNews;
import com.hhe.graduate.bean.ArticleNewsWithBLOBs;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/pages")
public class Article {

    public static final Logger log = LoggerFactory.getLogger(Article.class);

    @Autowired
    IArticleNewsService iArticleNewsService;

    private String prefix = "/pages";

    @GetMapping("/article")
    public String article() {
        return prefix + "/article";
    }

    @RequestMapping("/list")
    @ResponseBody
    public String list(Model model, @RequestParam(required=true,defaultValue="1") Integer page,
                       @RequestParam(required=false,defaultValue="10") Integer pageSize) {
        PageHelper.startPage(page, pageSize);
        List<ArticleNewsWithBLOBs> articleNews = iArticleNewsService.selectAll();
        PageInfo<ArticleNewsWithBLOBs> pageInfos = new PageInfo<ArticleNewsWithBLOBs> (articleNews);
        model.addAttribute("list", articleNews);
        model.addAttribute("pageInfos", pageInfos);
        return prefix + "/article";
    }

}
