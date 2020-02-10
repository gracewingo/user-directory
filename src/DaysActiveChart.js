import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default class DaysActiveChart extends PureComponent {

	getDaysOfWeek() {
		// What days of the week does a given user login most? 
		const { id, logins } = this.props.data[0];
		const obj = {id: id, logins: logins};
		obj.logins = obj.logins.map((login) => new Date(login.date).toString().substr(0, 3));
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
		return Object.keys(userLogins.logins).map((key) => ({
			day: key,
			mostActiveDaysPerUser_2019_2010: userLogins.logins[key]
		}));
	}

	sortDaysOfWeek(data) {
		const order = { Sun: 1, Mon: 2, Tue: 3, Wed: 4, Thu: 5, Fri: 6, Sat: 7 };
		return data.sort((a, b) => order[a.day] - order[b.day]);
	}

	render() {
		let userLogins = this.getDaysOfWeek();
		let actives = this.getMostActiveDays(userLogins);
		let data = this.sortDaysOfWeek(actives);
		console.log(data)

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
				<Line type="monotone" dataKey="mostActiveDaysPerUser_2019_2010" stroke="#8884d8" activeDot={{ r: 8 }} />
			</LineChart>
		);
	}
}

