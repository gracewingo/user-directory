import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import VisitorDetails from './VisitorDetails';
import { create } from 'react-test-renderer';

configure({ adapter: new Adapter() });

const data = [ { id: 21, name: 'Bob' } ];

describe('VisitorDetails component', () => {
	it('Matches the snapshot', () => {
		const visDetails = create(<VisitorDetails profileData={data} />);
		expect(visDetails.toJSON()).toMatchSnapshot();
	});

	it('shallow render', () => {
		shallow(<VisitorDetails profileData={data} />);
	});
});
