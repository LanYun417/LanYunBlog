/*
 Navicat Premium Data Transfer

 Source Server         : mysql_local
 Source Server Type    : MySQL
 Source Server Version : 50744 (5.7.44-log)
 Source Host           : localhost:3306
 Source Schema         : lyblog

 Target Server Type    : MySQL
 Target Server Version : 50744 (5.7.44-log)
 File Encoding         : 65001

 Date: 01/12/2024 22:34:52
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for access
-- ----------------------------
DROP TABLE IF EXISTS `access`;
CREATE TABLE `access`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `method` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '请求方法',
  `ip` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'IP地址',
  `province` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '省份',
  `city` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '城市',
  `isp` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '运营商',
  `country` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '国家',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '请求路径',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2222 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '访问日志表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of access
-- ----------------------------

-- ----------------------------
-- Table structure for admin_permission
-- ----------------------------
DROP TABLE IF EXISTS `admin_permission`;
CREATE TABLE `admin_permission`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '权限名称',
  `description` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '权限描述',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `PermissionId`(`id`) USING BTREE,
  UNIQUE INDEX `PermissionName`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '管理员权限表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin_permission
-- ----------------------------
INSERT INTO `admin_permission` VALUES (1, 'admin', '超级管理员', '2024-01-01 00:00:00', '2024-01-01 00:00:00');

-- ----------------------------
-- Table structure for admin_users
-- ----------------------------
DROP TABLE IF EXISTS `admin_users`;
CREATE TABLE `admin_users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png' COMMENT '头像URL',
  `nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '昵称',
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '密码',
  `permissionId` int(11) NOT NULL COMMENT '权限ID',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `UserId`(`id`) USING BTREE,
  UNIQUE INDEX `UserName`(`username`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '管理员用户表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin_users
-- ----------------------------
INSERT INTO `admin_users` VALUES (1, 'http://localhost:7077/static/444f6ad894a13af39a848dbcf349888b.jpg', '蓝云', 'admin', 'cdf4a007e2b02a0c49fc9b7ccfbb8a10c644f635e1765dcf2a7ab794ddc7edac', 1, '2024-01-01 00:00:00', '2024-12-01 22:29:47');

-- ----------------------------
-- Table structure for article_tag
-- ----------------------------
DROP TABLE IF EXISTS `article_tag`;
CREATE TABLE `article_tag`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `articleId` int(11) NOT NULL COMMENT '文章ID',
  `tagId` int(11) NOT NULL COMMENT '标签ID',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `ArticleTagID`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 34 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '文章标签关联表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of article_tag
-- ----------------------------
INSERT INTO `article_tag` VALUES (28, 5, 3, '2024-12-01 22:27:14', '2024-12-01 22:27:14');
INSERT INTO `article_tag` VALUES (29, 5, 5, '2024-12-01 22:27:14', '2024-12-01 22:27:14');
INSERT INTO `article_tag` VALUES (30, 5, 4, '2024-12-01 22:27:14', '2024-12-01 22:27:14');
INSERT INTO `article_tag` VALUES (31, 4, 3, '2024-12-01 22:27:21', '2024-12-01 22:27:21');
INSERT INTO `article_tag` VALUES (32, 3, 3, '2024-12-01 22:27:28', '2024-12-01 22:27:28');
INSERT INTO `article_tag` VALUES (33, 3, 1, '2024-12-01 22:27:28', '2024-12-01 22:27:28');

-- ----------------------------
-- Table structure for article_views
-- ----------------------------
DROP TABLE IF EXISTS `article_views`;
CREATE TABLE `article_views`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `ip` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'IP地址',
  `province` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '省份',
  `city` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '城市',
  `isp` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '运营商',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `articleId` int(11) NOT NULL COMMENT '文章ID',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 52 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '文章浏览记录' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of article_views
-- ----------------------------
INSERT INTO `article_views` VALUES (47, '::1', '', '', '本机地址', '2024-12-01 22:25:17', '2024-12-01 22:25:17', 5);
INSERT INTO `article_views` VALUES (48, '::1', '', '', '本机地址', '2024-12-01 22:27:10', '2024-12-01 22:27:10', 5);
INSERT INTO `article_views` VALUES (49, '::1', '', '', '本机地址', '2024-12-01 22:27:17', '2024-12-01 22:27:17', 4);
INSERT INTO `article_views` VALUES (50, '::1', '', '', '本机地址', '2024-12-01 22:27:24', '2024-12-01 22:27:24', 3);
INSERT INTO `article_views` VALUES (51, '::1', '', '', '本机地址', '2024-12-01 22:33:45', '2024-12-01 22:33:45', 5);

-- ----------------------------
-- Table structure for articles
-- ----------------------------
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '文章ID',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '文章标题',
  `cover` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '文章封面',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '文章内容',
  `categoryId` int(11) NOT NULL COMMENT '一级分类ID',
  `secCategoryId` int(11) NOT NULL COMMENT '二级分类ID',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `ArticleId`(`id`) USING BTREE,
  UNIQUE INDEX `ArticleTitle`(`title`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '文章表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of articles
-- ----------------------------
INSERT INTO `articles` VALUES (3, '前端开发：构建现代Web应用的基石', 'http://localhost:7077/static/6cbc4c2c504cd6dc90b7fa32c08a6f75.jpg', '# 前端开发：构建现代Web应用的基石\n\n## 引言\n\n在数字化时代，前端开发已经成为构建现代Web应用不可或缺的一部分。前端开发者负责设计、构建和优化用户界面，确保用户能够获得流畅、直观的体验。本文将深入探讨前端开发的核心技术、工具和最佳实践。\n\n## 前端开发基础\n\n### HTML：构建网页内容\n\nHTML（超文本标记语言）是构建网页内容的基础。它定义了网页的结构和内容，包括文本、图像、链接等。随着HTML5的推出，我们能够创建更加丰富和交互性强的网页。\n\n### CSS：美化网页\n\nCSS（层叠样式表）用于设置网页的视觉和版式。它允许开发者控制字体、颜色、布局等样式属性，使网页更具吸引力。\n\n### JavaScript：交互性与动态性\n\nJavaScript是前端开发的核心，它为网页添加交互性和动态功能。从简单的表单验证到复杂的单页应用（SPA），JavaScript都能提供强大的支持。\n\n## 前端框架和库\n\n### React\n\nReact是一个用于构建用户界面的JavaScript库，由Facebook开发。它采用组件化的方式构建应用，使得代码更加模块化和可重用。\n\n### Angular\n\nAngular是一个由Google支持的平台和框架，用于构建客户端应用。它提供了一套完整的解决方案，包括模板、表单处理、依赖注入等。\n\n### Vue.js\n\nVue.js是一个渐进式JavaScript框架，用于构建用户界面。它的设计哲学是易于上手和灵活，适合从小型项目到大型应用的开发。\n\n## 前端工具和工作流\n\n### 包管理器\n\n- **npm**：Node.js的包管理器，用于管理项目依赖。\n- **Yarn**：由Facebook开发的替代npm的包管理器，以更优的性能和速度著称。\n\n### 构建工具\n\n- **Webpack**：一个模块打包器，用于将项目中的所有资源打包成浏览器可以识别的格式。\n- **Rollup**：一个现代的JavaScript模块打包器，专注于ES6模块。\n\n### 版本控制\n\n- **Git**：一个分布式版本控制系统，用于跟踪文件和目录的更改。\n\n## 前端性能优化\n\n### 代码分割\n\n代码分割是一种将代码拆分成小块的技术，只有当需要时才加载这些代码块，从而减少首屏加载时间。\n\n### 懒加载\n\n懒加载是一种按需加载资源的技术，它可以减少页面加载时的资源消耗，提高页面响应速度。\n\n### 缓存策略\n\n合理使用浏览器缓存和应用服务端缓存可以显著提高应用性能和用户体验。\n\n## 结语\n\n前端开发是一个不断发展的领域，随着新技术和工具的出现，前端开发者需要不断学习和适应。掌握前端技术不仅能帮助我们构建更加丰富和动态的Web应用，还能提升用户体验，推动业务发展。\n\n---\n', 1, 1, '2024-12-01 13:08:06', '2024-12-01 22:27:28');
INSERT INTO `articles` VALUES (4, '🌐 前端开发的艺术与科学', 'http://localhost:7077/static/152b59cdebe261160a1f8be012f03700.png', '## 🚀 引言\n\n在这个快速变化的技术世界中，前端开发不仅仅是编写代码，它是一种艺术形式，一种将创意和逻辑结合在一起的方式。本文将带你探索前端开发的奇妙世界，从基础到高级技巧，让你的Web应用🚀起飞。\n\n## 🏗️ 前端开发基础\n\n### HTML：构建网页的骨架\n\nHTML是网页的骨架，它定义了网页的结构。以下是HTML的基本结构：\n\n```html\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Document</title>\n</head>\n<body>\n    <h1>Hello, World!</h1>\n</body>\n</html>\n```\n\n### CSS：给网页穿上衣服\n\nCSS负责网页的外观。以下是如何给一个按钮添加样式：\n\n```css\nbutton {\n    padding: 10px 20px;\n    background-color: #007BFF;\n    color: white;\n    border: none;\n    border-radius: 5px;\n    cursor: pointer;\n    transition: background-color 0.3s;\n}\n\nbutton:hover {\n    background-color: #0056b3;\n}\n```\n\n### JavaScript：让网页动起来\n\nJavaScript是前端开发的核心，它让网页变得动态和交互。以下是简单的JavaScript代码：\n\n```javascript\ndocument.addEventListener(\'DOMContentLoaded\', function() {\n    console.log(\'🎉 页面加载完成！\');\n});\n```\n\n## 🛠️ 前端框架和库\n\n### React：构建可复用的组件\n\nReact是一个用于构建用户界面的JavaScript库，它通过组件化的方式简化了开发过程。以下是React组件的基本结构：\n\n```jsx\nimport React from \'react\';\n\nfunction Welcome(props) {\n    return <h1>Hello, {props.name}</h1>;\n}\n\nexport default Welcome;\n```\n\n### Vue.js：简洁而强大的框架\n\nVue.js是一个渐进式JavaScript框架，它易于上手且灵活。以下是Vue组件的基本结构：\n\n```vue\n<template>\n  <div>\n    <h1>{{ message }}</h1>\n  </div>\n</template>\n\n<script>\nexport default {\n  data() {\n    return {\n      message: \'Hello Vue!\'\n    }\n  }\n}\n</script>\n```\n\n## 📈 前端性能优化\n\n### 图表：展示性能数据\n\n以下是使用图表展示性能数据的例子：\n\n```mermaid\ngraph LR\n    A[HTML] -->|加载| B(DOM树构建)\n    B --> C{JavaScript解析}\n    C --> D[渲染]\n    D --> E[页面显示]\n```\n\n### 代码分割：提升加载速度\n\n代码分割是现代前端开发中提升加载速度的关键技术。以下是使用Webpack进行代码分割的配置示例：\n\n```javascript\nmodule.exports = {\n    // ...其他配置\n    optimization: {\n        splitChunks: {\n            chunks: \'all\',\n        },\n    },\n};\n```\n\n## 📚 结语\n\n前端开发是一个充满挑战和机遇的领域。通过掌握HTML、CSS和JavaScript，你可以创建出既美观又功能强大的Web应用。不断学习和实践，你将能够在这个领域中🌟闪耀。\n\n---\n', 1, 1, '2024-12-01 13:10:43', '2024-12-01 22:27:21');
INSERT INTO `articles` VALUES (5, '🚀 后端开发：构建强大的服务器端', 'http://localhost:7077/static/6fceb872d8220c5071d89a38555a7774.png', '## 🌟 引言\n\n在Web开发的宇宙中，后端开发是那颗不可见但至关重要的星球。它负责处理数据存储、服务器逻辑和应用程序的核心功能。本文将带你深入了解后端开发的奥秘。\n\n## 🏗️ 后端基础\n\n### 数据库：数据的家\n\n后端开发中，数据库是存储和检索数据的关键。以下是使用SQL创建一个简单用户表的示例：\n\n```sql\nCREATE TABLE users (\n    id INT AUTO_INCREMENT PRIMARY KEY,\n    username VARCHAR(255) NOT NULL,\n    password VARCHAR(255) NOT NULL,\n    email VARCHAR(255) NOT NULL\n);\n```\n\n### 服务器：应用的心脏\n\n服务器是后端的核心，负责处理请求和响应。以下是使用Node.js和Express框架创建一个基本服务器的代码：\n\n```javascript\nconst express = require(\'express\');\nconst app = express();\nconst port = 3000;\n\napp.get(\'/\', (req, res) => {\n    res.send(\'Hello World!\');\n});\n\napp.listen(port, () => {\n    console.log(`Server running on port ${port}`);\n});\n```\n\n## 🛠️ 后端框架和工具\n\n### Node.js与Express：快速开发\n\nNode.js是一个基于Chrome V8引擎的JavaScript运行环境，而Express是一个灵活的Node.js Web应用框架，快速开发是它们的主要优势。以下是Express路由的一个简单示例：\n\n```javascript\napp.get(\'/users\', (req, res) => {\n    // 伪代码：从数据库获取用户列表\n    res.json([{ name: \'Alice\' }, { name: \'Bob\' }]);\n});\n```\n\n### Django：Python的强大框架\n\nDjango是一个高级的Python Web框架，它鼓励快速开发和干净、实用的设计。以下是Django视图的一个示例：\n\n```python\nfrom django.http import JsonResponse\n\ndef user_list(request):\n    # 伪代码：从数据库获取用户列表\n    users = [{\'name\': \'Alice\'}, {\'name\': \'Bob\'}]\n    return JsonResponse(users, safe=False)\n```\n\n## 📈 性能优化与监控\n\n### 图表：展示服务器性能\n\n以下是使用图表展示服务器性能的例子：\n\n```mermaid\ngraph LR\n    A[客户端] -->|请求| B(负载均衡器)\n    B --> C[服务器1]\n    B --> D[服务器2]\n    C --> E[数据库]\n    D --> E[数据库]\n```\n\n### 缓存：提升响应速度\n\n缓存是提高后端性能的重要技术。以下是使用Redis作为缓存的伪代码示例：\n\n```python\n# 伪代码：使用Redis缓存用户数据\nuser_cache = redis.get(\'user:1\')\nif user_cache is None:\n    user_cache = get_user_from_db(1)\n    redis.setex(\'user:1\', 3600, user_cache)\n```\n\n## 📚 结语\n\n后端开发是构建强大、可扩展和安全Web应用的基石。通过掌握数据库、服务器逻辑和各种框架，你可以构建出能够处理复杂业务需求的后端系统。\n', 2, 2, '2024-12-01 13:15:06', '2024-12-01 22:27:14');

-- ----------------------------
-- Table structure for author_info
-- ----------------------------
DROP TABLE IF EXISTS `author_info`;
CREATE TABLE `author_info`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '作者信息ID',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '头像URL',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '作者名称',
  `ps` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '个性签名',
  `biography` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '作者简介',
  `qq` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '168847242' COMMENT 'QQ号',
  `wechat` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '#' COMMENT '微信号',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '168847242@qq.com' COMMENT '邮箱',
  `github` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'https://gitee.com/lanyun417' COMMENT 'GitHub',
  `weibo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'https://weibo.com/' COMMENT '微博',
  `isUse` enum('yes','no') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '是否启用',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `AuthorId`(`id`) USING BTREE,
  UNIQUE INDEX `AuthorName`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '作者信息表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of author_info
-- ----------------------------
INSERT INTO `author_info` VALUES (1, 'http://localhost:7077/static/0815cad6496fb801edf495ac736d67ad.jpg', 'LanYun', '无数普通人中的一个.', '一位不知名的前端爱好者', '168847242', 'https://weixin.qq.com/', '168847242@qq.com', 'https://gitee.com/lanyun417', 'https://weibo.com', 'yes', '2024-11-30 16:01:13', '2024-12-01 22:29:42');

-- ----------------------------
-- Table structure for categories
-- ----------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '分类ID',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '分类名称',
  `description` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '分类描述',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `CategoryId`(`id`) USING BTREE,
  UNIQUE INDEX `CategoryName`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '文章一级分类表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of categories
-- ----------------------------
INSERT INTO `categories` VALUES (1, '前端开发', '前端开发', '2024-11-30 16:04:41', '2024-11-30 16:04:41');
INSERT INTO `categories` VALUES (2, '后端开发', '后端开发', '2024-12-01 13:13:24', '2024-12-01 13:13:24');

-- ----------------------------
-- Table structure for files
-- ----------------------------
DROP TABLE IF EXISTS `files`;
CREATE TABLE `files`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '文件名',
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '文件路径',
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '文件链接',
  `md5` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '文件MD5',
  `mimetype` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '文件类型',
  `size` int(11) NOT NULL COMMENT '文件大小（字节）',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `ID`(`id`) USING BTREE,
  UNIQUE INDEX `FileName`(`name`) USING BTREE,
  UNIQUE INDEX `FilePath`(`path`) USING BTREE,
  UNIQUE INDEX `FileMD5`(`md5`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '文件信息表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of files
-- ----------------------------
INSERT INTO `files` VALUES (16, '6fceb872d8220c5071d89a38555a7774.png', '/upload/6fceb872d8220c5071d89a38555a7774.png', 'http://localhost:7077/static/6fceb872d8220c5071d89a38555a7774.png', '9d51b447546e26e6f662fe3884776c4c', 'image/png', 1306872, '2024-12-01 22:27:13', '2024-12-01 22:27:13');
INSERT INTO `files` VALUES (17, '152b59cdebe261160a1f8be012f03700.png', '/upload/152b59cdebe261160a1f8be012f03700.png', 'http://localhost:7077/static/152b59cdebe261160a1f8be012f03700.png', '63bbdb5b76b8d349ad35ff4281efbd37', 'image/png', 2073805, '2024-12-01 22:27:20', '2024-12-01 22:27:20');
INSERT INTO `files` VALUES (18, '6cbc4c2c504cd6dc90b7fa32c08a6f75.jpg', '/upload/6cbc4c2c504cd6dc90b7fa32c08a6f75.jpg', 'http://localhost:7077/static/6cbc4c2c504cd6dc90b7fa32c08a6f75.jpg', 'acdfc27cec0f75fbd33772c1efff26b8', 'image/jpeg', 142302, '2024-12-01 22:27:27', '2024-12-01 22:27:27');
INSERT INTO `files` VALUES (19, '9a3ebdf09ff79342adc64ce6c8b8aee2.jpg', '/upload/photo/9a3ebdf09ff79342adc64ce6c8b8aee2.jpg', 'http://localhost:7077/static/photo/9a3ebdf09ff79342adc64ce6c8b8aee2.jpg', '72391885b88f125b344e94c2c68bda0b', 'image/jpeg', 262144, '2024-12-01 22:27:57', '2024-12-01 22:27:57');
INSERT INTO `files` VALUES (20, 'b96ccfc8950cdc911605d7ebd9ffbccf.jpg', '/upload/photo/b96ccfc8950cdc911605d7ebd9ffbccf.jpg', 'http://localhost:7077/static/photo/b96ccfc8950cdc911605d7ebd9ffbccf.jpg', '861bf7d3af72c3ea5dcba590814cc6e1', 'image/jpeg', 594785, '2024-12-01 22:28:13', '2024-12-01 22:28:13');
INSERT INTO `files` VALUES (21, 'eb0deb27de3a2b7d1c3f1dc8212102b0.ico', '/upload/eb0deb27de3a2b7d1c3f1dc8212102b0.ico', 'http://localhost:7077/static/eb0deb27de3a2b7d1c3f1dc8212102b0.ico', '717b138033a41361b32b60fc5062ab2a', 'image/x-icon', 16958, '2024-12-01 22:28:34', '2024-12-01 22:28:34');
INSERT INTO `files` VALUES (22, '7e2e79a3726d4fa50c82253ff187e34d.png', '/upload/7e2e79a3726d4fa50c82253ff187e34d.png', 'http://localhost:7077/static/7e2e79a3726d4fa50c82253ff187e34d.png', 'c6db57ab9472c59484260bc397b8cdd1', 'image/png', 4286, '2024-12-01 22:29:32', '2024-12-01 22:29:32');
INSERT INTO `files` VALUES (23, '0815cad6496fb801edf495ac736d67ad.jpg', '/upload/0815cad6496fb801edf495ac736d67ad.jpg', 'http://localhost:7077/static/0815cad6496fb801edf495ac736d67ad.jpg', '19196dd8a8e0d7e8c0a8820aa9f62723', 'image/jpeg', 66129, '2024-12-01 22:29:41', '2024-12-01 22:29:41');
INSERT INTO `files` VALUES (24, '444f6ad894a13af39a848dbcf349888b.jpg', '/upload/444f6ad894a13af39a848dbcf349888b.jpg', 'http://localhost:7077/static/444f6ad894a13af39a848dbcf349888b.jpg', 'd31e92f03c89d5902bf4719504436f8a', 'image/jpeg', 154708, '2024-12-01 22:29:46', '2024-12-01 22:29:46');

-- ----------------------------
-- Table structure for friendly_link
-- ----------------------------
DROP TABLE IF EXISTS `friendly_link`;
CREATE TABLE `friendly_link`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '友链ID',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '友链名称',
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '友链地址',
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '友链图标URL',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '友链描述',
  `status` enum('pending','approved','rejected') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'pending' COMMENT '友链审核状态',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '友链站长联系邮箱',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '备注',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `FriendlyLinkId`(`id`) USING BTREE,
  UNIQUE INDEX `FriendlyLinkUrl`(`url`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '友情链接表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of friendly_link
-- ----------------------------
INSERT INTO `friendly_link` VALUES (1, '百度', 'https://www.baidu.com', 'http://localhost:7077/static/eb0deb27de3a2b7d1c3f1dc8212102b0.ico', '百度一下，你就知道', 'approved', '168847242@qq.com', '', '2024-12-01 22:28:57', '2024-12-01 22:28:57');

-- ----------------------------
-- Table structure for leave_message
-- ----------------------------
DROP TABLE IF EXISTS `leave_message`;
CREATE TABLE `leave_message`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '留言ID',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '留言者邮箱',
  `message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '留言内容',
  `ip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '留言者IP',
  `country` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '未知' COMMENT '留言者所在国家',
  `province` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '未知' COMMENT '留言者所在省份',
  `city` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '未知' COMMENT '留言者所在城市',
  `isp` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '未知' COMMENT '留言者所使用网络运营商',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `LeaveMessageId`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '留言表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of leave_message
-- ----------------------------
INSERT INTO `leave_message` VALUES (1, '168847242@qq.com', '作者好帅，哈哈哈。', '::1', '', '', '', '本机地址', '2024-11-30 22:52:15', '2024-11-30 22:52:15');

-- ----------------------------
-- Table structure for photos
-- ----------------------------
DROP TABLE IF EXISTS `photos`;
CREATE TABLE `photos`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '照片URL',
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '照片路径',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '照片描述',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `PhotoId`(`id`) USING BTREE,
  UNIQUE INDEX `PhotoUrl`(`url`) USING BTREE,
  UNIQUE INDEX `PhotoPath`(`path`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '相册' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of photos
-- ----------------------------
INSERT INTO `photos` VALUES (3, 'http://localhost:7077/static/photo/9a3ebdf09ff79342adc64ce6c8b8aee2.jpg', '/upload/photo/9a3ebdf09ff79342adc64ce6c8b8aee2.jpg', 'Edge', '2024-12-01 22:28:05', '2024-12-01 22:28:05');
INSERT INTO `photos` VALUES (4, 'http://localhost:7077/static/photo/b96ccfc8950cdc911605d7ebd9ffbccf.jpg', '/upload/photo/b96ccfc8950cdc911605d7ebd9ffbccf.jpg', '福特超跑', '2024-12-01 22:28:13', '2024-12-01 22:28:13');

-- ----------------------------
-- Table structure for sec_categories
-- ----------------------------
DROP TABLE IF EXISTS `sec_categories`;
CREATE TABLE `sec_categories`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '分类ID',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '分类名称',
  `parentId` int(11) NOT NULL COMMENT '父级分类ID',
  `description` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '分类描述',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `SecCategoryId`(`id`) USING BTREE,
  UNIQUE INDEX `SecCategoryName`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '文章二级分类表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sec_categories
-- ----------------------------
INSERT INTO `sec_categories` VALUES (1, 'Vue', 1, 'Vue', '2024-11-30 16:04:47', '2024-11-30 16:04:47');
INSERT INTO `sec_categories` VALUES (2, 'Java', 2, 'Java', '2024-12-01 13:13:34', '2024-12-01 13:13:34');

-- ----------------------------
-- Table structure for site_info
-- ----------------------------
DROP TABLE IF EXISTS `site_info`;
CREATE TABLE `site_info`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '站点信息ID',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '站点标题',
  `keywords` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '站点关键词',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '站点描述',
  `globalStyle` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '全局样式',
  `globalScript` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '全局脚本',
  `domain` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '站点域名',
  `logo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '站点 Logo URL',
  `isUse` enum('yes','no') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '是否使用当前配置信息',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `InfoId`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '站点信息表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of site_info
-- ----------------------------
INSERT INTO `site_info` VALUES (1, '蓝云博客', '蓝云,博客,Blog,前端,开发,LanYun,Vue,JavaScript,HTML,CSS,React', '蓝云博客，一位不知名的前端开发者', '', 'console.log(\'Hello, LanYun!\')', 'http://localhost:3000', 'http://localhost:7077/static/7e2e79a3726d4fa50c82253ff187e34d.png', 'yes', '2024-11-30 16:03:38', '2024-12-01 22:33:17');

-- ----------------------------
-- Table structure for tags
-- ----------------------------
DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '标签ID',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '标签名称',
  `description` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '标签描述',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `TagId`(`id`) USING BTREE,
  UNIQUE INDEX `TagName`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '标签表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tags
-- ----------------------------
INSERT INTO `tags` VALUES (1, '前端', '前端', '2024-11-30 16:07:12', '2024-11-30 16:07:12');
INSERT INTO `tags` VALUES (2, 'Vue', 'Vue', '2024-11-30 16:07:17', '2024-11-30 16:07:17');
INSERT INTO `tags` VALUES (3, '教程', '教程', '2024-11-30 16:07:26', '2024-11-30 16:07:26');
INSERT INTO `tags` VALUES (4, 'Java', 'Java', '2024-12-01 13:14:09', '2024-12-01 13:14:09');
INSERT INTO `tags` VALUES (5, 'SQL', 'SQL', '2024-12-01 13:14:21', '2024-12-01 13:14:21');

SET FOREIGN_KEY_CHECKS = 1;
