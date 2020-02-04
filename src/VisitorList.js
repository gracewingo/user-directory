import React from 'react';
import Visitor from './Visitor';

export default class VisitorList extends React.Component {
	state = {
		search: ''
	};

	handleClick = (event) => {
		this.props.onUserClick(event.target.dataset.id);
	};

	handleChange = (event) => {
		const { name, value } = event.target;
		this.props.onSearch({ name, value });
	};

	updateSearch = (searchTerm) => {
		console.log(searchTerm);
		this.setState({
			[searchTerm.name]: searchTerm.value.substr(0, 20)
		});
		// this.state.userData.filter()
	};
	render() {
		let filteredUserData = this.props.data.filter((user) => {
			return user.first_name.indexOf(this.state.search) !== -1;
		});
		return (
			<div className="userList-pane">
				<div className="header">
					<h2>Visitor List</h2>
					<form>
						<label htmlFor="searchText" />
						<input id="searchText" type="text" name="search" onChange={this.handleChange} />
					</form>
				</div>

				<div className="profile">
					<ul>
						{filteredUserData.map((user) => {
							return (
								<Visitor
									key={user.id}
									dataId={user.id}
									firstName={user.first_name}
									lastName={user.last_name}
								/>
							);
						})}
					</ul>
				</div>
			</div>
		);
	}
}
