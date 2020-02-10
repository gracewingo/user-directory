import React from 'react';
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

import Visitor from './Visitor'

configure({adapter: new Adapter()});
it('shallow render', () => {
    const user = [{id: 21, name: 'Bob'}];
	shallow(<Visitor user={user}/>);
});

it('simulates click events', () => {
    const data = [{id: 21, name: 'Bob'}];
    const showUserProfile = sinon.spy();
    const wrapper = shallow(<Visitor user={data} showUserProfile={showUserProfile} />);
    wrapper.find('li').simulate('click');
    
});
