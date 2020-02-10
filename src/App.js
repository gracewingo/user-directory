import React from 'react';
import './App.css';
import VisitorList from './VisitorList';
import ScatterPlot from './ScatterPlot';
import { fetchUserData } from './apiCalls';
import Heatmap from './Heatmap';

export default class App extends React.Component {
	state = {
		userData: [],
		search: '',
		errorStatus: '',
		showVisitorList: false
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
		this.setState({
			[event.target.name]: event.target.value.substr(0, 20)
		});
	};

	handleClick = () => {
		// only allow clicks if scatter plot is not showing
		this.setState({
			showVisitorList: false
		});
	};

	render() {
		let filteredUserData = this.state.userData.filter((user) => {
			return user.first_name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
		});

		return (
			<div className="appContainer">
				<div data-testid="form" className="formContainer">
					<h2 onClick={this.handleClick}>Visitor List</h2>
					<label htmlFor="searchText" />
					<input
						id="searchText"
						type="text"
						name="search"
						placeholder="Search"
						value={this.state.search}
						onChange={this.updateSearch}
					/>
					<div>
						<button onClick={this.handleClick}>Click to see all users</button>
					</div>
				</div>
				<VisitorList showVisitorList={this.state.showVisitorList} data={filteredUserData} />

				<ScatterPlot data={this.state.userData} />
				<Heatmap data={this.state.userData} />
			</div>
		);
	}
}










/*
Sunday: 
- focus on testing. build tests!
- then, make agg chart conditional
- add color to vis list background 
- add a heatmap, other cool visualizations if i have time
- fix the number of days active label, include a Legend with a year  
- fix width and height on visitor list 

if a user is on the homepage, show all users,
otherwise, show individual charts
to navigaete back to all users, click the button 

To do:
- have the aggregate(scatter) chart be conditional - goes away when vistiro is clicked	
	- make the Visitor List form clickable which returns the aggregate chart


Code structure:
App -> 
	VisitorList -> 
		Visitor ->
	    VisitorDetails 

VisitorList and App are the two container components 



*/
