/**
 * [mod]天气模块，把天气数据抓取到本地服务器上
 */

var FetchDate = require("../FetchDate/FetchDate");

FetchDate.init({
  "url":"http://op.juhe.cn/onebox/weather/query?cityname=%E6%B8%A9%E5%B7%9E&key=4db15a544a32ba0d379af01e129725ab"
},"WeatherContent");
