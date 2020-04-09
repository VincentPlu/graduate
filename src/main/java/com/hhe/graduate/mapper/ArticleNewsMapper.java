package com.hhe.graduate.mapper;

import com.hhe.graduate.bean.ArticleNews;
import com.hhe.graduate.bean.ArticleNewsExample;
import com.hhe.graduate.bean.ArticleNewsWithBLOBs;
import java.util.List;

import org.apache.ibatis.annotations.MapKey;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Mapper
public interface ArticleNewsMapper {
    long countByExample(ArticleNewsExample example);

    int deleteByExample(ArticleNewsExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(ArticleNewsWithBLOBs record);

    int insertSelective(ArticleNewsWithBLOBs record);

    List<ArticleNewsWithBLOBs> selectByExampleWithBLOBs(ArticleNewsExample example);

    List<ArticleNews> selectByExample(ArticleNewsExample example);

    ArticleNewsWithBLOBs selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("record") ArticleNewsWithBLOBs record, @Param("example") ArticleNewsExample example);

    int updateByExampleWithBLOBs(@Param("record") ArticleNewsWithBLOBs record, @Param("example") ArticleNewsExample example);

    int updateByExample(@Param("record") ArticleNews record, @Param("example") ArticleNewsExample example);

    int updateByPrimaryKeySelective(ArticleNewsWithBLOBs record);

    int updateByPrimaryKeyWithBLOBs(ArticleNewsWithBLOBs record);

    int updateByPrimaryKey(ArticleNews record);

    List<ArticleNewsWithBLOBs> selectAll();
}