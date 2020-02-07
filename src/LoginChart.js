import React, { PureComponent } from 'react';
import { LineChart, Line } from 'recharts';

export default class LoginChart extends PureComponent {
	state = {
		chartData: ''
	};
	formatData = (props) => {
		// What days of the week does a given user login most?
		console.log(this.props.data);
		let userLogins = [];
		this.props.data.map((datum) => {
			let obj = {};
			obj.id = datum.id;
			obj.logins = datum.logins;
			userLogins.push(obj);
			return userLogins;
		});
		console.log(userLogins);
		userLogins.forEach(el => {
      console.log(el.logins)
      // Re-format the login array to get the days of the week 
      //el.logins.map(date => date = date.getDay())
    })
    console.log(userLogins);
	};

	render() {
		this.formatData(this.props);
		return (
			//   <LineChart
			//     width={500}
			//     height={300}
			//     data={data}
			//     margin={{
			//       top: 5, right: 30, left: 20, bottom: 5,
			//     }}
			//   >
			//     <CartesianGrid strokeDasharray="3 3" />
			//     <XAxis dataKey="date" />
			//     <YAxis />
			//     <Tooltip />
			//     <Legend />
			//     <Line type="monotone" dataKey="" stroke="#8884d8" activeDot={{ r: 8 }} />
			//   </LineChart>
			// );
			<div>Hello</div>
		);
	}
}
