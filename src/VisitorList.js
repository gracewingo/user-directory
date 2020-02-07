import React from 'react';
import Visitor from './Visitor';
import VisitorDetails from './VisitorDetails';

export default class VisitorList extends React.Component {
	state = {
		profileInfo: []
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
			<div className="visitor-container">
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
				{this.state.profileInfo.length ? <VisitorDetails profileData={this.state.profileInfo} /> : null}
			</div>
		);
	}
}
