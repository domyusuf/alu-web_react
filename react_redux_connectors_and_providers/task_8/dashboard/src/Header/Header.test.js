import React from 'react';
import { shallow } from 'enzyme';
import { Map } from 'immutable';
import { Header, mapStateToProps } from './Header';

describe('Header', () => {
  it('renders without a user', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('a')).toHaveLength(0);
  });
  it('shows authenticated content from props', () => {
    const wrapper = shallow(<Header user={{ email: 'student@example.com' }} />);
    expect(wrapper.text()).toContain('student@example.com');
  });
  it('maps the user from the Immutable store', () => {
    const user = { email: 'student@example.com' };
    expect(mapStateToProps({ ui: Map({ user }) })).toEqual({ user });
  });
});
