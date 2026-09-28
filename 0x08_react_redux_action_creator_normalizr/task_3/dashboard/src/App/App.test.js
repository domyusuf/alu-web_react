import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import AppContext, { defaultUser } from './AppContext';

describe('<App />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists()).toEqual(true);
  });

  it('contains the Notifications component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Notifications)).toHaveLength(1);
  });

  it('contains the Header component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Header)).toHaveLength(1);
  });

  it('contains the Login component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Login)).toHaveLength(1);
  });

  it('contains the Footer component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Footer)).toHaveLength(1);
  });

  it('checks CourseList is not displayed', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(CourseList)).toHaveLength(0);
  });

  it('updates displayDrawer when the drawer handlers are called', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.state('displayDrawer')).toBe(false);
    wrapper.instance().handleDisplayDrawer();
    expect(wrapper.state('displayDrawer')).toBe(true);
    wrapper.instance().handleHideDrawer();
    expect(wrapper.state('displayDrawer')).toBe(false);
  });

  it('removes a notification after it is marked as read', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.state('listNotifications')).toHaveLength(3);
    wrapper.instance().markNotificationAsRead(2);
    expect(wrapper.state('listNotifications')).toHaveLength(2);
    expect(wrapper.state('listNotifications').some(({ id }) => id === 2)).toBe(false);
  });
});

describe('authentication state', () => {
  it('verifies Login component is not included', () => {
    const wrapper = shallow(<App />);
    wrapper.instance().logIn('student@example.com', 'password');
    expect(wrapper.find(Login)).toHaveLength(0);
  });

  it('verifies CourseList component is included', () => {
    const wrapper = shallow(<App />);
    wrapper.instance().logIn('student@example.com', 'password');
    expect(wrapper.find(CourseList)).toHaveLength(1);
  });

  it('logs in and out through state and provides its context value', () => {
    const wrapper = shallow(<App />);
    wrapper.instance().logIn('student@example.com', 'password');
    expect(wrapper.state('value').user).toEqual({
      email: 'student@example.com', password: 'password', isLoggedIn: true
    });
    wrapper.instance().logOut();
    expect(wrapper.state('value').user).toEqual(defaultUser);
    expect(wrapper.find(AppContext.Provider)).toHaveLength(1);
  });
});

describe('when ctrl+h is pressed', () => {
  it('calls logOut function and alerts "Logging you out"', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const wrapper = shallow(<App />);
    const logOutMock = jest.fn();
    wrapper.setState(({ value }) => ({ value: { ...value, logOut: logOutMock } }));

    const event = new KeyboardEvent('keydown', { ctrlKey: true, key: 'h' });
    document.dispatchEvent(event);

    expect(alertMock).toHaveBeenCalledWith('Logging you out');
    expect(logOutMock).toHaveBeenCalled();

    jest.restoreAllMocks();
    wrapper.unmount();
  });
});
