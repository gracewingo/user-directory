import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import { create } from 'react-test-renderer';

import Visitor from './Visitor';

configure({ adapter: new Adapter() });

const user = [ { id: 21, name: 'Bob' } ];
const showUserProfile = sinon.spy();


describe('Visitor Component', () => {
	it('matches the snapshot', () => {
		const visitor = create(<Visitor user={user} />);
		expect(visitor.toJSON()).toMatchSnapshot();
	});

	it('shallow render', () => {
		shallow(<Visitor user={user} />);
	});

	it('simulates click events', () => {
		const wrapper = shallow(<Visitor user={user} showUserProfile={showUserProfile} />);
		wrapper.find('li').simulate('click');
	});
});
