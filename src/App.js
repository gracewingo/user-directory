import React from 'react';
import './App.css';
import VisitorList from './VisitorList';
import { fetchUserData } from './apiCalls';

export default class App extends React.Component {
	state = {
		userData: [],
		search: '',
		errorStatus: '',
		dataLength: ""
	};

	async componentDidMount() {
		try {
			const data = await fetchUserData();
			this.setState({ userData: data, dataLength: data.length });
		} catch (err) {
			this.setState({ errorStatus: err.message });
		}
	}

	updateSearch = (event) => {
		this.setState({
			[event.target.name]: event.target.value.substr(0, 20)
			
		});
	};

	render() {
		let filteredUserData = this.state.userData.filter((user) => {
			return user.first_name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
		});

		return (
			<div className="appContainer">
				<div data-testid="form" className="formContainer">
					<h2>Visitor List</h2>
					<label htmlFor="searchText" />
					<input
						id="searchText"
						type="text"
						name="search"
						placeholder="Search"
						value={this.state.search}
						onChange={this.updateSearch}
					/>
				</div>
				<VisitorList data={filteredUserData} dataLength={this.state.dataLength} />
			</div>
		);
	}
}
