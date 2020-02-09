import React from 'react';
import './App.css';
import VisitorList from './VisitorList';
import ScatterPlot from './ScatterPlot';


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
				<ScatterPlot data={this.state.userData} />
			</div>
		);
	}
}

/*
Sunday: 
- 

To do:
- have the aggregate(scatter) chart be conditional - goes away when vistiro is clicked	
	- make the Visitor List form clickable which returns the aggregate chart
- do testing tomorrow morning 
- work on a heatmap! 
- re-factor 
- call it a day



Code structure:
App -> 
	VisitorList -> 
		Visitor ->
	    VisitorDetails 

VisitorList and App are the two container components 



*/
