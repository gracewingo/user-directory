import React from 'react';
import './App.css';
import VisitorList from './VisitorList';

export default class App extends React.Component {
	state = {
		userData: [],
		search: ''
	};

	componentDidMount = async () => {
		fetch('people.json').then((res) => res.json()).then((json) => {
			this.setState((state) => ({
				userData: state.userData.concat(json)
			}));
		});
	};

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
				<div className="formContainer">
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
				<VisitorList search={this.state.search} data={filteredUserData} />
			</div>
		);
	}
}

/*
TODO:

- also, i could pass the whole user data object into the Visitor component 
- that way when a user clicks on a Visitor, that click render visitor details 
- make the Visitor Details have a max width of 1100 or something so that the Visitr
	List doesn't go to a single column
- consider making DaysActiveChart a functional component 
- heatmap
	i could have a dropdown filter with all 12 months, and a chloropeth that shows states 
	that have the most logins BY MONTH




Code structure:
App -> 
	VisitorList -> 
		Visitor ->
	    VisitorDetails 

VisitorList and App are the two container components 


*/
