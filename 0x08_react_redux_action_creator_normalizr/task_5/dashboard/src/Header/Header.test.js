import React from 'react';
import { mount, shallow } from 'enzyme';
import Header from './Header';
import AppContext from '../App/AppContext';

describe('<Header />', () => {
  it('renders without crashing', () => {
    shallow(<Header />);
  });

  it('renders img and h1 tags', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('img').length).toBe(1);
    expect(wrapper.find('h1').length).toBe(1);
  });

  it('does not render logoutSection with the default context', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('#logoutSection')).toHaveLength(0);
  });

  it('renders the current user and invokes logOut', () => {
    const logOut = jest.fn();
    const wrapper = mount(
      <AppContext.Provider value={{
        user: { email: 'student@example.com', password: 'password', isLoggedIn: true },
        logOut
      }}>
        <Header />
      </AppContext.Provider>
    );
    expect(wrapper.find('#logoutSection').text()).toContain('student@example.com');
    wrapper.find('#logoutSection a').simulate('click', { preventDefault: jest.fn() });
    expect(logOut).toHaveBeenCalled();
    expect(Header.contextType).toBe(AppContext);
    wrapper.unmount();
  });
});
