/***
 +----------------------------------------------------------------------
 | 网站定制开发 微信：woniu_2025 [ WE ARE THE BEST. 2021-06-26 ]
 +----------------------------------------------------------------------
 | Copyright (c) 2021 https://snailweb.cn All Rights Reserved.
 +----------------------------------------------------------------------
 | Licensed ( https://snailweb.cn )
 +----------------------------------------------------------------------
 | Author: snail <137224272@qq.com>
 +----------------------------------------------------------------------
 ***/
console.log("\n %c 网站定制开发加微信：woniu_2025 %c https://snailweb.cn \n", "color: #ffffff; background: #f1404b; padding:5px 0;", "background: #030307; padding:5px 0;");

var imgArr = [
    './img/1.jpg',
    './img/2.jpg',
    './img/3.jpg',
    'https://imgapi.xiaowansm.repl.co/api.php',
]
bgImg = imgArr[Math.floor(Math.random() * imgArr.length)];
$('.img-bg').css('background-image', 'url(' + bgImg + ')');
var theme = {
    "ajaxurl": "",
    "addico": "/static/index/picture/add.png",
    "order": "asc",
    "formpostion": "top",
    "defaultclass": "io-grey-mode",
    "isCustomize": "1",
    "icourl": "",
    "icopng": ".png",
    "urlformat": "1",
    "customizemax": "10",
    "newWindow": "0",
    "lazyload": "1",
    "minNav": "1",
    "loading": "1",
    "hotWords": "baidu",
    "classColumns": " col-sm-6 col-md-4 col-xl-5a col-xxl-6a ",
    "apikey": ""
};
var localize = {
    "liked": "您已经赞过了!",
    "like": "谢谢点赞!",
    "networkerror": "网络错误 --.",
    "selectCategory": "为什么不选分类。",
    "addSuccess": "添加成功。",
    "timeout": "访问超时，请再试试，或者手动填写。",
    "lightMode": "日间模式",
    "nightMode": "夜间模式",
    "editBtn": "编辑",
    "okBtn": "确定",
    "urlExist": "该网址已经存在了 --.",
    "cancelBtn": "取消",
    "successAlert": "成功",
    "infoAlert": "信息",
    "warningAlert": "警告",
    "errorAlert": "错误",
    "extractionCode": "网盘提取码已复制，点“确定”进入下载页面。"
};
