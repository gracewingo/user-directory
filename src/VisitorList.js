import React from 'react';
import Visitor from './Visitor';
import VisitorDetails from './VisitorDetails';
import DaysActiveChart from './DaysActiveChart';

export default class VisitorList extends React.Component {
	state = {
		profileInfo: [],
		userLogins: []
	};

	handleClick = (event) => {
		this.props.onUserClick(event.target.dataset.id);
	};

	handleChange = (event) => {
		const { name, value } = event.target;
		this.props.onSearch({ name, value });
	};

	showUserProfile = (id) => {
		// When user is clicked, show their profile in Visitor Details.
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
							return (
								<Visitor
									key={user.id}
									user={user}
									showUserProfile={this.showUserProfile}
								/>
							);
						})}
					</ul>
				</div>
				{this.state.profileInfo.length ? 
				<div className="visitorDetails-container">
					<VisitorDetails profileData={this.state.profileInfo} /> 
					<DaysActiveChart data={this.state.profileInfo} />
				</div>
				: null}
			</div>
		);
	}
}

/*
show the login history for that user, when their visitor name is clicked
no need to compute all the login data for each visitor if it's not rendered 


*/