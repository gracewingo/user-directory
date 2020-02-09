import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default class ScatterPlot extends React.Component {
	// Get the Total number of logins for all users, for each month
	getLoginData() {
		let monthArray = this.props.data.map((datum) => {
			const obj = {};
			obj.logins = datum.logins;
			return obj;
		});
		return monthArray;
	}

	getMonths(loginData) {
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
		let result19 = Object.keys(monthsIn2019).map((key) => ({ month: key, totalLogins: monthsIn2019[key] }));
		return result19;
	}

	formatMonths(data) {
        let copy = data.slice();
        console.log(copy)
		for (let i = 0; i < copy.length; i++) {
            console.log(copy[i])
			copy[i].month = Number(copy[i].month);
			switch (copy[i].month) {
				case 0:
					copy[i].month = 'Jan';
					break;
				case 1:
					copy[i].month = 'Feb';
					break;
				case 2:
					copy[i].month = 'March';
					break;
				case 3:
					copy[i].month = 'April';
					break;
				case 4:
					copy[i].month = 'May';
					break;
				case 5:
					copy[i].month = 'June';
					break;
				case 6:
					copy[i].month = 'July';
					break;
				case 7:
					copy[i].month = 'Aug';
					break;
				case 8:
					copy[i].month = 'Sept';
					break;
				case 9:
					copy[i].month = 'Oct';
					break;
				case 10:
					copy[i].month = 'Nov';
					break;
				case 11:
					copy[i].month = 'Dec';
					break;
				default:
			}
		}
		return copy;
    }
    
    getMin(data){
    
    }
    
    getMax(data){
        // data.reduce((min, p) => p.totalLogins < min ? )
    }

	render() {
		let loginData = this.getLoginData();
        let numberOfMonths = this.getMonths(loginData);
        let copy = numberOfMonths.slice();
        // let labels = this.formatMonths(numberOfMonths);
        // console.log(labels)
        // console.log(finalData);
        let min = this.getMin(numberOfMonths);
        let max = this.getMax(numberOfMonths);

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
				<XAxis type="number" dataKey="month" name="month"/>
				<YAxis type="number" domain={[740, 900]} dataKey="totalLogins" name="totalLogins" />
				<Tooltip cursor={{ strokeDasharray: '3 3' }} />
				<Scatter data={numberOfMonths} fill="#8884d8" />
			</ScatterChart>
		);
	}
}
