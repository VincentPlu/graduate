/*
 Navicat MySQL Data Transfer

 Source Server         : 阿里云
 Source Server Type    : MySQL
 Source Server Version : 50729
 Source Host           : 47.114.163.135:3306
 Source Schema         : graduate

 Target Server Type    : MySQL
 Target Server Version : 50729
 File Encoding         : 65001

 Date: 19/03/2020 08:55:26
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'uuid',
  `user_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户姓名',
  `user_loginName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户登录名',
  `user_pass` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户登录密码',
  `user_sex` varchar(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户性别（0：男性，1：女性）',
  `user_head` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户头像',
  `user_integrals` int(100) NULL DEFAULT NULL COMMENT '用户积分',
  `user_type` char(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户类别（0：管理员，1：普通用户）',
  `user_email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户邮箱',
  `user_remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户备注',
  `user_create_time` datetime(0) NULL DEFAULT NULL COMMENT '用户注册时间',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '最后一次更新时间',
  `del_flag` int(2) NULL DEFAULT NULL COMMENT '删除标记（0：已删除，1：正在使用）',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('001', '何浩', 'hhe', '123', '0', NULL, 999, '0', NULL, NULL, '2020-03-19 08:54:25', '2020-03-20 08:54:33', 1);
INSERT INTO `user` VALUES ('002', '文广', 'gwen', '123', '0', NULL, 999, '0', NULL, NULL, '2020-03-19 08:54:29', '2020-03-20 08:54:39', 1);

SET FOREIGN_KEY_CHECKS = 1;
