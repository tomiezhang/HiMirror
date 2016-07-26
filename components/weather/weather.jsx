/**
 * [jsx]天气面板插件
 */
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jQuery';

export class Weather extends React.Component {
	constructor() {
	super();
	this.state = {
		realTimeWeather:{
			temperature:0,
			img:"1",
			pm25:0,
			weekWeather:[]
		}
	};
	}
	componentDidMount(){
		var _this = this;
		$.get("WeatherContent.js",function( data ){
			if(data){
				//var wData = data.result.data;
				var wData = WeatherContent.data.result.data;
				_this.setState({
					realTimeWeather:{
						temperature: wData.realtime.weather.temperature,
						img:wData.realtime.weather.img,
						pm25:wData.pm25.pm25,
						weekWeather:wData.weather
					}
				});
			}
		});
	}

	render() {
		let items = this.state.realTimeWeather.weekWeather;

		return (
			<div className="mod weather">
				<div className="hd">
					<img src="http://www.heweather.com/weather/images/icon/100.png"/>
					<p>{this.state.realTimeWeather.temperature}<span>°</span>C</p><span className="AIQ">{this.state.realTimeWeather.pm25.curPm}{this.state.realTimeWeather.pm25.quality}</span>
				</div>
				<div className="bd">
					<ul>
						{items.map(function(item){
							return 	<li className="info">星期{item.week}&nbsp;&nbsp;<img height="32"  src="http://www.heweather.com/weather/images/icon/103.png"/>&nbsp;&nbsp;27°C&nbsp;&nbsp;微风</li>
						})}
					</ul>
				</div>
				<div className="ft">
					<div className="alertTips"><svg width="16" height="16" viewBox="0 0 16 16"><g className="transform-group"><g transform="scale(0.015625, 0.015625)"><path d="M512.50142 958.397886c-119.320573 0-231.499491-46.465265-315.871087-130.837884C112.258737 743.188406 65.792449 631.010511 65.792449 511.688915c0-119.319549 46.466288-231.499491 130.837884-315.871087C281.002952 111.445208 393.180847 64.979944 512.50142 64.979944s231.499491 46.465265 315.871087 130.837884c84.372619 84.372619 130.837884 196.551538 130.837884 315.871087 0 119.321596-46.465265 231.499491-130.837884 315.871087C744.000911 911.932622 631.821993 958.397886 512.50142 958.397886zM512.50142 105.962334c-223.718271 0-405.726581 182.00831-405.726581 405.726581s182.00831 405.726581 405.726581 405.726581c223.718271 0 405.727605-182.00831 405.727605-405.726581S736.220714 105.962334 512.50142 105.962334zM510.150886 775.953647c-18.107403 0-32.745798-14.678304-32.745798-32.785707L477.405087 452.191846c0-18.108426 14.638395-32.785707 32.745798-32.785707 18.107403 0 32.745798 14.678304 32.745798 32.785707l0 290.976094C542.896684 761.275343 528.258289 775.953647 510.150886 775.953647zM511.357364 296.458969m-45.080731 0a44.054 44.054 0 1 0 90.161463 0 44.054 44.054 0 1 0-90.161463 0Z" fill="#ecf0f1"></path></g></g></svg> <span className="info">天气较舒适，不适宜洗车，天气炎热，建议着短衫、短裙、短裤、薄型T恤衫等清凉夏季服装</span></div>
				</div>
			</div>
		);
	}
}
module.exports = Weather;
