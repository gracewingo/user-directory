import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import { create } from 'react-test-renderer';

import VisitorList from './VisitorList';
import Visitor from './Visitor';
import VisitorDetails from './VisitorDetails';
import DaysActiveChart from './DaysActiveChart';

const data = [ { id: 21, name: 'Bob' } ];
const showVisitorList = sinon.spy();

describe('<VisitorList />', () => {
	configure({ adapter: new Adapter() });
	it('shallow render', () => {
		shallow(<VisitorList data={data} showVisitorList={showVisitorList} />);
	});

	// it('it shows the profile info when clicked', () => {
	// 	const component = create(<VisitorList data={data} showVisitorList={showVisitorList} />);

	// 	const instance = component.root;
	// 	const listItem = instance.findByType('li');
	// 	listItem.props.onClick();
	// 	expect().toBe()
	// });

	it('should render Visitor component', () => {
		const wrapper = mount(<VisitorList data={data} showVisitorList={showVisitorList} />);
		expect(wrapper.find(Visitor).length);
		expect(wrapper.find(VisitorDetails).length);
		expect(wrapper.find(DaysActiveChart).length);
	});

	// When i click a visitor, that should update the state of show profile
	it('should update profileInfo state', () => {
		const wrapper = mount(<VisitorList data={data} showVisitorList={showVisitorList} />);
		expect(wrapper.state().profileInfo).toEqual([]);
		const user = [ { id: 21, name: 'Bob' } ];
		const showUserProfile = sinon.spy();
		const wrapper2 = shallow(<Visitor user={user} showUserProfile={showUserProfile} />);
		wrapper2.find('li').simulate('click');
		expect(wrapper.state().profileInfo).toHaveLength(1);
	});
});
