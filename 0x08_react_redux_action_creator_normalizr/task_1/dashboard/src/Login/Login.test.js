import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';

describe('<Login />', () => {
  it('renders without crashing', () => {
    shallow(<Login />);
  });

  it('renders the form inputs and labels', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find('input').length).toBe(3);
    expect(wrapper.find('label').length).toBe(2);
  });

  it('disables submit by default', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find('input[type="submit"]').prop('disabled')).toBe(true);
  });

  it('enables submit when email and password are populated', () => {
    const wrapper = shallow(<Login />);
    wrapper.find('input[type="email"]').simulate('change', {
      target: { value: 'student@example.com' }
    });
    wrapper.find('input[type="password"]').simulate('change', {
      target: { value: 'password' }
    });
    expect(wrapper.find('input[type="submit"]').prop('disabled')).toBe(false);
  });

  it('prevents reload and calls logIn with the credentials on submit', () => {
    const preventDefault = jest.fn();
    const logIn = jest.fn();
    const wrapper = shallow(<Login logIn={logIn} />);
    wrapper.setState({ email: 'student@example.com', password: 'password' });
    wrapper.find('form').simulate('submit', { preventDefault });
    expect(preventDefault).toHaveBeenCalled();
    expect(logIn).toHaveBeenCalledWith('student@example.com', 'password');
  });
});
