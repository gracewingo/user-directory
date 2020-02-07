import React from 'react';

const Visitor = ({user, showUserProfile }) => (
	<li
		className="visitor"
		key={user.id}
		data-id={user.id}
		onClick={() => showUserProfile(user.id)}
	>
		{user.first_name} {user.last_name}
	</li>
);

export default Visitor;
