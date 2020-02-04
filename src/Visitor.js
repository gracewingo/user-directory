import React from 'react';

export default function Visitor(props) {
	console.log(props);
	return (
		<div key={props.key} data-id={props.dataId}>
			<li>
				{props.firstName} {props.lastName}
			</li>
		</div>
	);
}
