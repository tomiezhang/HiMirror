/**
 * node服务：每天抓取天气数据到本地
 */
var request = require('request');
request('http://op.juhe.cn/onebox/weather/query?cityname=%E6%B8%A9%E5%B7%9E&key=4db15a544a32ba0d379af01e129725ab', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Show the HTML for the Google homepage.
  }else{
  	console.log(error);
  }
})