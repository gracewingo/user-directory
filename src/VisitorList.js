import React from 'react';
import Visitor from './Visitor';
import DaysActiveChart from './DaysActiveChart';
import VisitorDetails from './VisitorDetails';
import Toggle from 'react-toggle';
import './css/Toggle.css';
import AreaChart from './AreaChart';
import Heatmap from './Heatmap';

export default class VisitorList extends React.Component {
	state = {
		profileInfo: [],
		showAggregateCharts: false
	};

	showUserProfile = (id) => {
		// When a user is clicked, show their profile in Visitor Details.
		let profileData = this.props.data.filter((user) => user.id === Number(id));

		this.setState({
			profileInfo: profileData
		});
	};

	handleVisitorClick = (id) => {
		return this.showUserProfile(id);
	};

	// this is a first class function. it is a function assigned to a variable
	handleChartChange = () => {
		this.setState((state) => ({
			showAggregateCharts: !state.showAggregateCharts
		}));
	};

	render() {
		return (
			<div className="mainContent">
				<div className="visitorList-pane">
					<ul className="visitorList">
						{this.props.data.map((user) => {
							return <Visitor key={user.id} user={user} handleClick={this.handleVisitorClick} />;
						})}
					</ul>
				</div>
				<div className="visitorData">
					{!this.state.profileInfo.length ? (
						<p className="homeHeader">Select a User</p>
					) : (
						<div className="visitorDetailsContainer">
							<label className="visitorToggle">
								<Toggle
									defaultChecked={this.state.showAggregateCharts}
									className="theme-color"
									onChange={this.handleChartChange}
								/>
								<span>Show All Visitor Data</span>
							</label>

							<div className="visitorProfileContainer">
								<VisitorDetails profileData={this.state.profileInfo} />
								<DaysActiveChart data={this.state.profileInfo} />
							</div>
						</div>
					)}
					{this.state.showAggregateCharts ? (
						<div className="aggregateCharts">
							<AreaChart data={this.props.data} />
							<Heatmap data={this.props.data} />
						</div>
					) : null}
				</div>
			</div>
		);
	}
}
