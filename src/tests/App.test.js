import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme'
import { fetchUserData } from '../apiCalls'

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<App />, div);
});

it('renders form container correctly', () => {
	const { getByTestId } = render(<App />);
	expect(getByTestId('form').textContent).toBe('Visitor List');
});

configure({adapter: new Adapter()});
// describe('App', () => {
// 	describe('componentDidMount', () => {
// 		it('sets the state componentDidMount', async () => {
// 			window.fetch = jest.fn().mockImplementationOnce(() => ({
// 				status: 200,
// 				json: () => new Promise((resolve, reject) => {
// 					resolve({
// 						userData: [
// 							{id: 10, first_name: "john", last_name: "smith",
// 							city: "baltimore", state:"md", safe_email: "hello@gmail.com",
// 							email: "hello@gmail.com", logins: [{date: "1/10/2019"}]},
// 							{id: 11, first_name: "joni", last_name: "smith",
// 							city: "baltimore", state:"md", safe_email: "hello2@gmail.com",
// 							email: "hello2@gmail.com", logins: [{date: "1/20/2019"}]}
// 						]
// 					})
// 				})
// 			}))
// 			const renderedComponent = await shallow(<App />)
//     		await renderedComponent.update()
//     		expect(renderedComponent.state('userData').length).toEqual(199)
// 		})
// 	})
// })

describe('apiCalls', () => {
	it('returns an object if status code is ok', () => {
	  window.fetch = jest.fn().mockImplementation(() => ({
		status: 200,
		json: () => new Promise((resolve, reject) => {
		  resolve({
			userData: [],
		  })
		}),
	  }))
  
	  expect(fetchUserData()).resolves.toEqual({ userData: [] })
	})
  
	it('throws an error if status code is not ok', () => {
	  window.fetch = jest.fn().mockImplementation(() => ({
		status: 500,
	  }))
  
	  expect(fetchUserData()).rejects.toEqual(Error('Error fetching user data'))
	})
  })