import React from 'react';
import Visitor from './Visitor';
import VisitorDetails from './VisitorDetails';
import DaysActiveChart from './DaysActiveChart';
import ScatterPlot from './ScatterPlot';
import Heatmap from './Heatmap';
import { Button } from 'reactstrap';


export default class VisitorList extends React.Component {
	state = {
		profileInfo: [],
		toggleAllUserData: true
	};

	showUserProfile = (id) => {
		// When a user is clicked, show their profile in Visitor Details.
		let profileData = this.props.data.filter((user) => {
			return user.id === Number(id);
		});
		this.setState({
			profileInfo: profileData
		});
	};

	handleClick = (event) => {
		// Cn click render the Scatterplot.
		this.setState({
			profileInfo: []
		});
	};

	render() {
		return (
			<div className="visitorContainer">
				<div className="visitorList-pane">
					<ul className="visitorList">
						{this.props.data.map((user) => {
							return <Visitor key={user.id} user={user} showUserProfile={this.showUserProfile} />;
						})}
					</ul>
				</div>
				{this.state.profileInfo.length ? (
					<div>
						<div>
							<Button style={{margin: '10px'}}onClick={this.handleClick} color="info">Click to see all users Charts</Button>
						</div>
						<div className="visitorDetails-container">
							<VisitorDetails profileData={this.state.profileInfo} />
							<DaysActiveChart data={this.state.profileInfo} />
						</div>
					</div>
				) : (
					<div>
						<ScatterPlot data={this.props.data} />
						<Heatmap data={this.props.data} />
					</div>
				)}
			</div>
		);
	}
}
