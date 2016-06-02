/**
 * node服务：每天抓取wunderlist上的todo事件，用来给时间模块提供提醒支持
 */
var cheerio = require("cheerio");
var request = require('superagent');
var http = require('request');
var WunderlistSDK = require('wunderlist');
var fs = require('fs');

var getWunderList = {
	conf:{
		dataArr:[],
		csrf:null,
		email:"tomiezhangIMAC@qq.com",
		psw:"088420ZYHzyh"
	},
	init:function() {
		var url = "http://www.wunderlist.com/login?redirect_url=/webapp";
		http(url, function(error, response, body) {
			var $ = cheerio.load(body);
			$("input[name='_csrf']").each(function(index,ele){
				getWunderList.csrf = $(ele).val();
				getWunderList.goIn();
			})
		})
	},
	Header:{
		 Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    	Origin: 'https://www.wunderlist.com',
    	'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.63 Safari/537.36',
    	'Content-Type': 'application/x-www-form-urlencoded',
    	 Referer: 'https://www.wunderlist.com/login?redirect_url=/webapp',
    	'Accept-Encoding': 'gzip, deflate, br',
    	'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.6,en;q=0.4,sr;q=0.2'
	},
	goIn:function(){
		request.post("https://www.wunderlist.com/login").set(getWunderList.Header).type('form').send({
			_csrf:getWunderList.csrf,
			email:getWunderList.email,
			password:getWunderList.psw
		}).end(function (err,result) {
			//var cookiesLogin = "_gat=1; _ga=GA1.2.1426904847.1464316879; LOGGEDIN=true; AUTHSTATE=login; "+result.headers['set-cookie'][0].split(";")[0];//带上登录产生的cookie
			request.post("https://www.wunderlist.com/authorize").set({
				"Accept":"*/*",
				"Accept-Encoding":"gzip, deflate, sdch, br",
				"Accept-Language":"zh,en-US;q=0.8,en;q=0.6,zh-CN;q=0.4,zh-TW;q=0.2",
				"Cookie":"_gat=1; _ga=GA1.2.1426904847.1464316879; LOGGEDIN=true; AUTHSTATE=login; _wl=fezmBrIzTMXQoVwbbZtfjQ.CD9Brkw1v5l42tEJrhHbdKwSp_8Cl-gVKJKfmEp73vSr-y0_6Y0wz2gRdk6Oi_OBT6sO6FODvmNIf2wZPHFkEBba52yxUxP7NAYlq7gNrhbnkvGxymJxQeUYFChR8vW7jJ01_DxD5ERVFFqsmPLltQ.1464316880246.7776000000.GR0XZO57R4bm6DGRBC1dXEftKzh83sIMM3hhcim_wbk",
				"Host":"www.wunderlist.com",
				"Referer":"https://www.wunderlist.com/login?redirect_url=/webapp",
				"User-Agent":"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.63 Safari/537.36"
			}).type('json').send({
				client_id: "498d3ffc44ddfa2f275b"
			}).end(function(err,result){
				console.log()
				var wunderlistAPI = new WunderlistSDK({
				  'accessToken': result.body.access_token,
				  'clientID': "498d3ffc44ddfa2f275b",
				  'services':['lists','tasks']
				});
				wunderlistAPI.http.lists.all()
				  .done(function (lists) {
				    /* do stuff */
				    for(var i=0;i<lists.length;i++){
				    	wunderlistAPI.http.tasks.forList(lists[i]['id'])
				      .done(function (tasksData, statusCode) {
				        // 拿到任务
				      	var countJob = 0;//计数器
				       for(var j=0;j<tasksData.length;j++){
				       		countJob++;
				       		if(tasksData[j]['due_date']!==undefined){
				       			//对比任务截至时间，未到期的记录本地并提示
				       			var taskTime = new Date(tasksData[j]['due_date']+" 23:59:00").getTime()
				       			var nowTime = new Date().getTime();//每天凌晨12点启动脚本
				       			if(taskTime > nowTime){
				       				getWunderList.conf.dataArr.push("'"+tasksData[j].title+"|"+tasksData[j].due_date+"'");
				       				if(countJob === tasksData.length){
				       					//console.log(getWunderList.conf.dataArr);
				       					getWunderList.writeFile(getWunderList.conf.dataArr);
				       				}
				       			}
				       		}
				       }
				      })
				      .fail(function (resp, code) {
				        // ...
				      });
				    }
				  })
				  .fail(function () {
				    console.error('there was a problem');
				  });
			})
		});
	},
	/*
	记录本地
	 */
	writeFile:function(item){
		fs.writeFile('../../public/timerContent.js', 'var TimeDate = {"count":'+item.length+',"data":['+item+']}',  function(err) {
					 if (err) {
					       return console.error(err);
					 }
					 console.log("数据写入成功！");
		});
	}
}
getWunderList.init();