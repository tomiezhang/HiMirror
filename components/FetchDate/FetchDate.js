/**
 * [mod]通用抓取模块，用来在每天定时启动，把所需的信息抓到树莓派本地Node服务器上
 */

var request = require("request");
var fs = require("fs");

var FetchDate = {
  init:function(o,n){
    this.opt = o;
    this.name = n;
    this.getByrequest();
  },
  getByrequest:function() {
    var _this = this;
    request(this.opt,function(error,res,body) {
      if(!error && res.statusCode == 200){
        _this.writeFile(body);
      }else{
        //写入错误日志
        _this.writeLog(_this.name,error);
      }
    })
  },
  writeFile:function(item) {
    var _this = this;
    fs.writeFile("../../public/"+ this.name +".js", "var "+this.name+" = {'data':"+ item +"}",  function(err) {
					 if (err) {
					    _this.writeLog(_this.name+"_writeErr",err);
					 }else {
					   console.log("数据写入成功!");
					 }

		});
  },
  writeLog:function(name,item) {
    fs.appendFile(name+".log",item+"\n",function(err) {
      if (err) throw err;
      console.log("日志写入成功!");
    })
  }
}

module.exports = FetchDate
