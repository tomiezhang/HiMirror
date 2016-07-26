/**
 * [jsx] 时间面板插件
 */
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jQuery';

export class Timer extends React.Component {
	constructor() {
	super();
	this.times = null;
  this.state = { time: [],list:{} }
	/**
	* 1890 - 2100 年的农历数据
	* 数据格式：[0,2,9,21936]
    * [闰月所在月，0为没有闰月; *正月初一对应公历月; *正月初一对应公历日; *农历每月的天数的数组（需转换为二进制,得到每月大小，0=小月(29日),1=大月(30日)）;]
	*/
    this.lunarInfo = [[2,1,21,22184],[0,2,9,21936],[6,1,30,9656],[0,2,17,9584],[0,2,6,21168],[5,1,26,43344],[0,2,13,59728],[0,2,2,27296],[3,1,22,44368],[0,2,10,43856],[8,1,30,19304],[0,2,19,19168],[0,2,8,42352],[5,1,29,21096],[0,2,16,53856],[0,2,4,55632],[4,1,25,27304],[0,2,13,22176],[0,2,2,39632],[2,1,22,19176],[0,2,10,19168],[6,1,30,42200],[0,2,18,42192],[0,2,6,53840],[5,1,26,54568],[0,2,14,46400],[0,2,3,54944],[2,1,23,38608],[0,2,11,38320],[7,2,1,18872],[0,2,20,18800],[0,2,8,42160],[5,1,28,45656],[0,2,16,27216],[0,2,5,27968],[4,1,24,44456],[0,2,13,11104],[0,2,2,38256],[2,1,23,18808],[0,2,10,18800],[6,1,30,25776],[0,2,17,54432],[0,2,6,59984],[5,1,26,27976],[0,2,14,23248],[0,2,4,11104],[3,1,24,37744],[0,2,11,37600],[7,1,31,51560],[0,2,19,51536],[0,2,8,54432],[6,1,27,55888],[0,2,15,46416],[0,2,5,22176],[4,1,25,43736],[0,2,13,9680],[0,2,2,37584],[2,1,22,51544],[0,2,10,43344],[7,1,29,46248],[0,2,17,27808],[0,2,6,46416],[5,1,27,21928],[0,2,14,19872],[0,2,3,42416],[3,1,24,21176],[0,2,12,21168],[8,1,31,43344],[0,2,18,59728],[0,2,8,27296],[6,1,28,44368],[0,2,15,43856],[0,2,5,19296],[4,1,25,42352],[0,2,13,42352],[0,2,2,21088],[3,1,21,59696],[0,2,9,55632],[7,1,30,23208],[0,2,17,22176],[0,2,6,38608],[5,1,27,19176],[0,2,15,19152],[0,2,3,42192],[4,1,23,53864],[0,2,11,53840],[8,1,31,54568],[0,2,18,46400],[0,2,7,46752],[6,1,28,38608],[0,2,16,38320],[0,2,5,18864],[4,1,25,42168],[0,2,13,42160],[10,2,2,45656],[0,2,20,27216],[0,2,9,27968],[6,1,29,44448],[0,2,17,43872],[0,2,6,38256],[5,1,27,18808],[0,2,15,18800],[0,2,4,25776],[3,1,23,27216],[0,2,10,59984],[8,1,31,27432],[0,2,19,23232],[0,2,7,43872],[5,1,28,37736],[0,2,16,37600],[0,2,5,51552],[4,1,24,54440],[0,2,12,54432],[0,2,1,55888],[2,1,22,23208],[0,2,9,22176],[7,1,29,43736],[0,2,18,9680],[0,2,7,37584],[5,1,26,51544],[0,2,14,43344],[0,2,3,46240],[4,1,23,46416],[0,2,10,44368],[9,1,31,21928],[0,2,19,19360],[0,2,8,42416],[6,1,28,21176],[0,2,16,21168],[0,2,5,43312],[4,1,25,29864],[0,2,12,27296],[0,2,1,44368],[2,1,22,19880],[0,2,10,19296],[6,1,29,42352],[0,2,17,42208],[0,2,6,53856],[5,1,26,59696],[0,2,13,54576],[0,2,3,23200],[3,1,23,27472],[0,2,11,38608],[11,1,31,19176],[0,2,19,19152],[0,2,8,42192],[6,1,28,53848],[0,2,15,53840],[0,2,4,54560],[5,1,24,55968],[0,2,12,46496],[0,2,1,22224],[2,1,22,19160],[0,2,10,18864],[7,1,30,42168],[0,2,17,42160],[0,2,6,43600],[5,1,26,46376],[0,2,14,27936],[0,2,2,44448],[3,1,23,21936],[0,2,11,37744],[8,2,1,18808],[0,2,19,18800],[0,2,8,25776],[6,1,28,27216],[0,2,15,59984],[0,2,4,27424],[4,1,24,43872],[0,2,12,43744],[0,2,2,37600],[3,1,21,51568],[0,2,9,51552],[7,1,29,54440],[0,2,17,54432],[0,2,5,55888],[5,1,26,23208],[0,2,14,22176],[0,2,3,42704],[4,1,23,21224],[0,2,11,21200],[8,1,31,43352],[0,2,19,43344],[0,2,7,46240],[6,1,27,46416],[0,2,15,44368],[0,2,5,21920],[4,1,24,42448],[0,2,12,42416],[0,2,2,21168],[3,1,22,43320],[0,2,9,26928],[7,1,29,29336],[0,2,17,27296],[0,2,6,44368],[5,1,26,19880],[0,2,14,19296],[0,2,3,42352],[4,1,24,21104],[0,2,10,53856],[8,1,30,59696],[0,2,18,54560],[0,2,7,55968],[6,1,27,27472],[0,2,15,22224],[0,2,5,19168],[4,1,25,42216],[0,2,12,42192],[0,2,1,53584],[2,1,21,55592],[0,2,9,54560]];

    }
    //计算两个公历之间的时间差
    getDaysBetweenSolar(year,month,day,year1,month1,day1) {
		var date = new Date(year,month,day).getTime();
        var date1 = new Date(year1,month1,day1).getTime();
		return (date1-date) / 86400000;
    }
    //获取农历年份一年的每月的天数及一年的总天数
    getLunarYearDays(year) {
    	var yearData = this.lunarInfo[year-1890];
        var leapMonth = yearData[0]; //闰月
	    var monthData = yearData[3].toString(2);
	    var monthDataArr = monthData.split('');

	   //还原数据至16位,少于16位的在前面插入0（二进制存储时前面的0被忽略）
	    for(var i=0;i<16-monthDataArr.length;i++){
	        monthDataArr.unshift(0);
	    }

	    var len = leapMonth ? 13 : 12; //该年有几个月
        var yearDays = 0;
	        var monthDays = [];
	        for(var i=0;i<len;i++){
	            if(monthDataArr[i]==0){
	                yearDays += 29;
	                monthDays.push(29);
	            }else{
	                yearDays += 30;
	                monthDays.push(30);
	            }
	        }

	        return {
	            yearDays : yearDays,
	            monthDays : monthDays
	        };
    }
    //通过间隔天数查找农历日期
    getLunarDateByBetween(year,between,ganzhi) {
			var lunarYearDays = this.getLunarYearDays(year);
	        var end = between>0 ? between : lunarYearDays.yearDays - Math.abs(between);
	        var monthDays = lunarYearDays.monthDays;
	        var tempDays = 0;
	        var month = 0;
	        for(var i=0;i<monthDays.length;i++){
	            tempDays += monthDays[i];
	            if(tempDays > end){
	                month = i;
	                tempDays = tempDays-monthDays[i];
	                break;
	            }
	        }
	        return [year,month,parseInt(end - tempDays + 1),ganzhi];
    }
    //农历
    lunarCal(year,month,day) {
    	var year=parseInt(year,10),month = parseInt(month,10),day=parseInt(day,10);
    	var Gan = ["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"],Zhi= ["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"];
    	var termInfo = [0,21208,42467,63836,85337,107014,128867,150921,173149,195551,218072,240693,263343,285989,308563,331033,353350,375494,397447,419210,440795,462224,483532,504758];
    	//获取立春时间
    	 var offDate = new Date( ( 31556925974.7*(year-1890) + termInfo[2]*60000  ) + Date.UTC(1890,0,5,16,2,31) );
    	 var lichunDate = offDate.getUTCDate();
    	 var ganzhiYear = (month>1 || month==1 && day>=lichunDate) ? year+1 : year;//干支所在年份
    	 var firstTerm =new Date( ( 31556925974.7*(year-1890) + termInfo[(month*2)]*60000  ) + Date.UTC(1890,0,5,16,2,31) ) //某月第一个节气开始日期
    	 //return(Gan[(ganzhiYear-1890+25)%10]+Zhi[(ganzhiYear-1890+25)%12]);//返回干支年
    	  var yearData = this.lunarInfo[year-1890],zenMonth = yearData[1],zenDay = yearData[2];
    	  var between = this.getDaysBetweenSolar(year,parseInt(zenMonth-1),zenDay,year,month-1,day);
    	 //console.log(year+"/"+parseInt(zenMonth-1)+"/"+zenDay+"****"+year+"/"+month+"/"+day);
    	 if(between==0){ //正月初一
	            return [year,0,1,(Gan[(ganzhiYear-1890+25)%10]+Zhi[(ganzhiYear-1890+25)%12])];
	        }else{
	            var lunarYear = between>0 ? year : year-1;
	            //console.log(lunarYear+"year");
	            return this.getLunarDateByBetween(lunarYear,between,(Gan[(ganzhiYear-1890+25)%10]+Zhi[(ganzhiYear-1890+25)%12]));
        }
    }
	//更新日期和时间
	upDateTime() {
		var now = new Date();
		var dayWorlds = ["星期天","星期一","星期二","星期三","星期四","星期五","星期六"];
		var lunarMonthName = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
		var lunarDayName = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十', '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十', '卅一'];
		var year = now.getFullYear(),month=now.getMonth()+1,date=now.getDate(),day=dayWorlds[now.getDay()],hours=now.getHours(),minutes=now.getMinutes();
		if(minutes<10){
			minutes="0"+minutes;
		}
		var nongYear = this.lunarCal(year,month,date)[3],nongYue=lunarMonthName[this.lunarCal(year,month,date)[1]],nongRi=lunarDayName[this.lunarCal(year,month,date)[2]-1];
		this.setState({time: [year+"年",month+"月",date+"日",day,hours,minutes,nongYear,nongYue,nongRi]});
		//查看清单
		this.getWunderlist();
  
	}

	//定时监控奇妙清单本日任务
	getWunderlist() {
		var _self = this;
		$.get("timerContent.js",function( data ){
			//console.log( data );
			_self.setState({list:TimeDate});
		});
	}

	componentDidMount(){
		this.times = setInterval(this.upDateTime.bind(this),1000);
	}

  componentWillUnmount() {
	 	clearInterval(this.times);
	 }

	render() {
		return (
			 <div className="mod timezone">
				<div className="hd">{this.state.time[0]}{this.state.time[1]}{this.state.time[2]}{this.state.time[3]}<p>{this.state.time[6]}年{this.state.time[7]}月{this.state.time[8]}日</p></div>
				<div className="bd">{this.state.time[4]}:{this.state.time[5]}</div>
				<div className="ft">
					<div className="alertTips"><svg width="16" height="16" viewBox="0 0 16 16"><defs></defs><g className="transform-group"><g transform="scale(0.015625, 0.015625)"><path d="M512.50142 958.397886c-119.320573 0-231.499491-46.465265-315.871087-130.837884C112.258737 743.188406 65.792449 631.010511 65.792449 511.688915c0-119.319549 46.466288-231.499491 130.837884-315.871087C281.002952 111.445208 393.180847 64.979944 512.50142 64.979944s231.499491 46.465265 315.871087 130.837884c84.372619 84.372619 130.837884 196.551538 130.837884 315.871087 0 119.321596-46.465265 231.499491-130.837884 315.871087C744.000911 911.932622 631.821993 958.397886 512.50142 958.397886zM512.50142 105.962334c-223.718271 0-405.726581 182.00831-405.726581 405.726581s182.00831 405.726581 405.726581 405.726581c223.718271 0 405.727605-182.00831 405.727605-405.726581S736.220714 105.962334 512.50142 105.962334zM510.150886 775.953647c-18.107403 0-32.745798-14.678304-32.745798-32.785707L477.405087 452.191846c0-18.108426 14.638395-32.785707 32.745798-32.785707 18.107403 0 32.745798 14.678304 32.745798 32.785707l0 290.976094C542.896684 761.275343 528.258289 775.953647 510.150886 775.953647zM511.357364 296.458969m-45.080731 0a44.054 44.054 0 1 0 90.161463 0 44.054 44.054 0 1 0-90.161463 0Z" fill="#ecf0f1"></path></g></g></svg> <span className="info">您今天有<u>{this.state.list.count}</u>件重要事情</span></div>
				</div>
			</div>
		);
	}
}
module.exports = Timer;
