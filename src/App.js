import React from 'react';
import './css/App.css';
import VisitorList from './VisitorList';
import { fetchUserData } from './api/apiCalls';
import Form from './Form';

export default class App extends React.Component {
	state = {
		userData: [],
		search: '',
		errorStatus: ''
	};

	async componentDidMount() {
		try {
			const data = await fetchUserData();
			this.setState({ userData: data });
		} catch (err) {
			this.setState({ errorStatus: err.message });
		}
	}

	updateSearch = (event) => {
		const { name, value } = event.target;
		this.setState({
			[name]: value.substr(0, 20)
		});
	};

	render() {
		const dataLength = this.state.userData.length;
		
		const sorted = this.state.userData.sort((a, b) => {
			if (a.last_name < b.last_name) { return -1;}
			if (a.last_name > b.last_name) { return 1;}
			return 0;
		});

		// Search by first and last name
		let filteredUserData = sorted.filter((user) => {
			return (
				user.first_name.concat(` ${user.last_name}`).toLowerCase().indexOf(this.state.search.toLowerCase()) !==
				-1
			);
		});

		return (
			<div className="appContainer">
				<Form searchText={this.state.search} updateSearch={this.updateSearch} />
				<VisitorList data={filteredUserData} dataLength={dataLength} />
			</div>
		);
	}
}
