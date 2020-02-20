import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import './css/Heatmap.css'
import ReactTooltip from 'react-tooltip';

export default class Heatmap extends React.Component {
	getDateValues(props) {
		let logins = [];
		for (let i = 0; i < props.data.length; i++) {
			logins.push(props.data[i].logins);
		}

		let flattened = logins.reduce((acc, cv) => {
			return acc.concat(cv);
		}, []);

		let obj = {};
		for (let i = 0; i < flattened.length; i++) {
			let key = flattened[i].date.toString().substr(0, 10);
			if (obj[key]) {
				// If date exists, increment the count
				obj[key]++;
			} else {
				obj[key] = 1;
			}
		}
		return obj;
	}

	formatDateData(data) {
		let values = [];
		let keys = Object.keys(data);
		for (let i = 0; i < keys.length; i++) {
			let obj = { date: keys[i], count: data[keys[i]] };
			values.push(obj);
		}

		for (let i = 0; i < values.length; i++) {
			if (values[i].count <= 20) {
				values[i].count = 20;
			} else if (values[i].count > 20 && values[i].count <= 25) {
				values[i].count = 25;
			} else if (values[i].count > 25 && values[i].count <= 30) {
				values[i].count = 30;
			} else if (values[i].count > 30 && values[i].count <= 35) {
				values[i].count = 35;
			} else if (values[i].count > 35 && values[i].count <= 40) {
				values[i].count = 40;
			}
		}
		return values;
	}

	render() {
		let data = this.getDateValues(this.props);
		let values = this.formatDateData(data);

		return (
			<div>
				<CalendarHeatmap
					startDate={new Date('2019-01-01')}
					endDate={new Date('2020-01-31')}
					values={values}
					classForValue={(value) => {
						if (!value) {
							return 'color-empty';
						}
						return `color-github-${value.count}`;
					}}
					tooltipDataAttrs={(value) => {
						return {
							'data-tip': `${value.date} has count: ${value.count}`
						};
					}}
					showWeekdayLabels={true}
					onClick={(value) => alert(`Clicked on value with count: ${value.count}`)}
				/>
				<ReactTooltip />
			</div>
		);
	}
}
