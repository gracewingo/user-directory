import React from 'react';

const VisitorDetails = ({ profileData }) => (
	<div className="preview-pane">
		<h1>Visitor Details</h1>
		<div id="profile">
			<div>
				Name: {profileData[0].first_name} {profileData[0].last_name}
			</div>
			<div>City: {profileData[0].city}</div>
			<div>State: {profileData[0].state}</div>
			<div>Safe email: {profileData[0].safe_email}</div>
			<div>Email: {profileData[0].email}</div>
		</div>
	</div>
);

export default VisitorDetails;
