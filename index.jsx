require("./css/main.css");
import React from 'react';
import ReactDOM from 'react-dom';
import Timer from "./components/timer/time";
import Weather from "./components/weather/weather";


//导航组件
export class Nav extends React.Component {
	constructor() {
		super();

	}


	render() {
			return (
				<div>
					<Timer/>
					<Weather/>
				</div>
			);
		}
}

ReactDOM.render(<Nav/>, document.querySelector("#nav"));
