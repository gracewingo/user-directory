import React from 'react';
import './App.css';
import VisitorList from './VisitorList';
import VisitorDetails from './VisitorDetails';

export default class App extends React.Component {
	state = {
		userData: [],
		profileInfo: []
	};

	componentDidMount = async () => {
		fetch('people.json').then((res) => res.json()).then((json) => {
			this.setState((state) => ({
				userData: state.userData.concat(json)
			}));
		});
	};

	showUserProfile = (id) => {
		// When user is clicked, show their profile in Visitor Details.
		let profileData = this.state.userData.filter((user) => {
			return user.id === Number(id);
		});
		this.setState({
			profileInfo: profileData
		});
	};

	render() {
		return (
			<div className="container">
				<VisitorList
					data={this.state.userData}
					onUserClick={this.showUserProfile}
					onSearch={this.updateSearch}
				/>
				{this.state.profileInfo.length ? <VisitorDetails profileData={this.state.profileInfo} /> : null}
			</div>
		);
	}
}
