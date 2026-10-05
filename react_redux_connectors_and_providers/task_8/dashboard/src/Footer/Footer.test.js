import React from 'react';
import { shallow } from 'enzyme';
import { Map } from 'immutable';
import { Footer, mapStateToProps } from './Footer';

describe('Footer', () => {
  it('renders without a user', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('a')).toHaveLength(0);
  });
  it('shows authenticated content from props', () => {
    const wrapper = shallow(<Footer user={{ email: 'student@example.com' }} />);
    expect(wrapper.text()).toContain('Contact us');
  });
  it('maps the user from the Immutable store', () => {
    const user = { email: 'student@example.com' };
    expect(mapStateToProps({ ui: Map({ user }) })).toEqual({ user });
  });
});
