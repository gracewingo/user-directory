import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import VisitorList from './VisitorList';
import sinon from 'sinon';


describe('<VisitorList />', () => {
	configure({ adapter: new Adapter() });
	it('shallow render', () => {
        const data = [{id: 21, name: 'Bob'}];
        const showVisitorList = sinon.spy();
		shallow(<VisitorList data={data} showVisitorList={showVisitorList}/>);
	});

});
