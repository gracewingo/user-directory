import React from 'react';
import { ScatterChart, Legend, Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default class ScatterPlot extends React.Component {
	// Get the Total number of logins for all users, for each month
	getLoginData() {
		let monthArray = this.props.data.map((datum) => {
			const obj = { logins: datum.logins };
			return obj;
		});
		return monthArray;
	}

	getTotalLogins(loginData) {
		// For the year 2019, get the total logins for each month
		// refactor so i don't need a nested for loop - use other array methods
		let monthsIn2019 = {};
		for (let i = 0; i < loginData.length; i++) {
			for (let j = 0; j < loginData[i].logins.length; j++) {
				let login = loginData[i].logins[j].date;

				if (login.substr(0, 4) === '2019') {
					let date1 = new Date(login);
					let month = date1.getMonth();
					if (monthsIn2019[month]) {
						monthsIn2019[month]++;
					} else {
						monthsIn2019[month] = 1;
					}
				}
			}
		}
		let result19 = Object.keys(monthsIn2019).map((key) => ({ month: key, totalLogins: monthsIn2019[key] }));
		return result19;
	}

	getMinAndMax(data) {
		let min = data.reduce((min, cv) => (cv.totalLogins < min ? cv.totalLogins : min), data[0].totalLogins);
		let max = data.reduce((max, cv) => (cv.totalLogins > max ? cv.totalLogins : max), data[0].totalLogins);
		return [ min, max ];
	}

	render() {
		let loginData = this.getLoginData();
		let totalLogins = this.getTotalLogins(loginData);
		let min, max;
		if (totalLogins.length) {
			[ min, max ] = this.getMinAndMax(totalLogins);
		}

		return (
			<ScatterChart
				width={400}
				height={400}
				margin={{
					top: 20,
					right: 20,
					bottom: 20,
					left: 20
				}}
			>
				<CartesianGrid />
				<XAxis type="number" dataKey="month" name="month" />
				<YAxis type="number" domain={[ min - 15, max + 15 ]} dataKey="totalLogins" name="totalLogins" />
				<Tooltip cursor={{ strokeDasharray: '3 3' }} />
				<Legend />
				<Scatter name="Monthly Logins Total Users, 2019, (0 = Jan, 1 = Feb)" data={totalLogins} fill="#8884d8" />
			</ScatterChart>
		);
	}
}
