import React from 'react';

const Form = ({ searchText, updateSearch }) => {
	return (
		<div className="formContainer">
			<h2>Visitor List</h2>
			<input
				id="searchText"
				type="text"
				name="search"
				placeholder="Search"
				value={searchText}
				onChange={updateSearch}
			/>
		</div>
	);
};

export default Form;
