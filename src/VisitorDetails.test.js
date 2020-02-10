import React from 'react';
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import VisitorDetails from './VisitorDetails'

configure({adapter: new Adapter()});
it('shallow render', () => {
	const data = [{id: 21, name: 'Bob'}];
	shallow(<VisitorDetails profileData={data}/>);
});
