import React from 'react';

export default function VisitorDetails(props) {
	// destructure .props
	return (
		<div className="preview-pane">
			<h1>Visitor Details</h1>

			<div id="profile">
				<div id="first-name">First name: {props.profileData[0].first_name}</div>
				<div>Last name: {props.profileData[0].last_name}</div>
				<div>City: {props.profileData[0].city}</div>
				<div>State: {props.profileData[0].state}</div>
				<div>Safe email: {props.profileData[0].safe_email}</div>
				<div>Email: {props.profileData[0].email}</div>
			</div>
		</div>
	);
}
