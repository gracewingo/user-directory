import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import { fetchUserData } from './apiCalls';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<App />, div);
});

it('renders form container correctly', () => {
	const { getByTestId } = render(<App />);
	expect(getByTestId('form').textContent).toBe('Visitor ListClick to see all users');
});

configure({ adapter: new Adapter() });

describe('apiCalls', () => {
	it('returns an object if status code is OK', () => {
		window.fetch = jest.fn().mockImplementation(() => ({
			status: 200,
			json: () =>
				new Promise((resolve, reject) => {
					resolve({
						userData: []
					});
				})
		}));

		expect(fetchUserData()).resolves.toEqual({ userData: [] });
	});

	it('throws an error if status code is not OK', () => {
		window.fetch = jest.fn().mockImplementation(() => ({
			status: 500
		}));
		expect(fetchUserData()).rejects.toEqual(Error('Error fetching user data'));
	});

	it('handles search field input', () => {
		const wrapper = shallow(<App />);
		wrapper.find('input').at(0).simulate('change', { target: { name: 'search', value: '012' } });
	});	
});
