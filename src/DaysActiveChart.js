import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default class LoginChart extends PureComponent {

	getDaysOfWeek() {
		const obj = {};
		const { id, logins } = this.props.data[0];
		obj.id = id;
		obj.logins = logins;
		const loginArray = obj.logins.map((login) => new Date(login.date).toString().substr(0, 3));
		obj.logins = loginArray;
		return obj;
	}

	getMostActiveDays(userLogins) {
		// For each user, count the active days
		let loginObj = {};
		for (let i = 0; i < userLogins.logins.length; i++) {
			if (loginObj[userLogins.logins[i]]) {
				loginObj[userLogins.logins[i]]++;
			} else {
				loginObj[userLogins.logins[i]] = 1;
			}
		}
		userLogins.logins = loginObj;
		// Create an array of objects
		let result = Object.keys(userLogins.logins).map((key) => ({
			day: key,
			numberOfDaysActive: userLogins.logins[key]
		}));
		return result;
	}

	sortDaysOfWeek(data) {
		const order = { Sun: 1, Mon: 2, Tue: 3, Wed: 4, Thu: 5, Fri: 6, Sat: 7 };
		data.sort((a, b) => order[a.day] - order[b.day]);
		return data;
	}

	render() {
		let userLogins = this.getDaysOfWeek();
		let actives = this.getMostActiveDays(userLogins);
		let data = this.sortDaysOfWeek(actives);

		return (
			<LineChart
				width={500}
				height={300}
				data={data}
				margin={{
					top: 5,
					right: 30,
					left: 20,
					bottom: 5
				}}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="day" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Line type="monotone" dataKey="numberOfDaysActive" stroke="#8884d8" activeDot={{ r: 8 }} />
			</LineChart>
		);
	}
}

/*

display a line chart for each user 
0, 5, 10, 15, 20 
also, show a aggregated version in some way 

xaxis: day of the week/login
yaxis: 0 -20 


*/
