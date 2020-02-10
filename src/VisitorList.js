import React from 'react';
import Visitor from './Visitor';
import VisitorDetails from './VisitorDetails';
import DaysActiveChart from './DaysActiveChart';

export default class VisitorList extends React.Component {
	state = {
		profileInfo: []
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
				{this.props.showVisitorList && this.state.profileInfo.length ? (
					<div className="visitorDetails-container">
						<VisitorDetails profileData={this.state.profileInfo} />
						<DaysActiveChart data={this.state.profileInfo} />
					</div>
				) : null}
			</div>
		);
	}
}
