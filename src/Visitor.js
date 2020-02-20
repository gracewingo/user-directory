import React from 'react';
import { IoMdPerson } from 'react-icons/io';

const Visitor = ({ user, handleClick }) => {
	return (
		<div className="visitorContainer">
			<IoMdPerson />
			<li className="visitor" key={user.id} data-id={user.id} onClick={() => handleClick(user.id)}>
				{user.first_name} {user.last_name}
			</li>
		</div>
	);
};

export default Visitor;
