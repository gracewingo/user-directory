import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

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
		let result19 = Object.keys(monthsIn2019).map((key) => ({ month: key, 'Total Logins': monthsIn2019[key] }));
		return result19;
	}

	formatMonthlyData(data) {
		for (let i = 0; i < data.length; i++) {
			switch (parseInt(data[i].month)) {
				case 0:
					data[i].month = 'Jan';
					break;
				case 1:
					data[i].month = 'Feb';
					break;
				case 2:
					data[i].month = 'Mar';
					break;
				case 3:
					data[i].month = 'April';
					break;
				case 4:
					data[i].month = 'May';
					break;
				case 5:
					data[i].month = 'June';
					break;
				case 6:
					data[i].month = 'July';
					break;
				case 7:
					data[i].month = 'Aug';
					break;
				case 8:
					data[i].month = 'Sept';
					break;
				case 9:
					data[i].month = 'Oct';
					break;
				case 10:
					data[i].month = 'Nov';
					break;
				case 11:
					data[i].month = 'Dec';
					break;
				default:
					return 0;
			}
		}
		return data;
	}

	getMinAndMax(data) {
		// If cv.TotalLogins is less than the min, which is the first value in the data.totalLogins array, return cv.TotalLogins
		let min = data.reduce((min, cv) => (cv.totalLogins < min ? cv.totalLogins : min), data[0].totalLogins);
		let max = data.reduce((max, cv) => (cv.totalLogins > max ? cv.totalLogins : max), data[0].totalLogins);
		return [ min, max ];
	}

	render() {
		let loginData = this.getLoginData();
		let totalLogins = this.getTotalLogins(loginData);
		let data = this.formatMonthlyData(totalLogins);

		return (
			<AreaChart
				width={500}
				height={400}
				data={data}
				margin={{
					top: 10,
					right: 30,
					left: 0,
					bottom: 0
				}}
			>
				<defs>
					<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
						<stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
						<stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
					</linearGradient>
				</defs>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="month" />
				<YAxis />
				<Tooltip />
				<Area name="Total Logins Per Month, 2019" type="monotone" dataKey="Total Logins" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
				<Legend verticalAlign="bottom" />
				
			</AreaChart>
		);
	}
}
