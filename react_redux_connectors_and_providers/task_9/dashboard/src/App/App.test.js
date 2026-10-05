import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { App, mapStateToProps } from './App';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import CourseList from '../CourseList/CourseList';
import Notifications from '../Notifications/NotificationsContainer';

describe('App presentation', () => {
  let wrapper;
  afterEach(() => { if (wrapper) wrapper.unmount(); });
  it('renders the dashboard and login while logged out', () => {
    wrapper = shallow(<App />);
    [Header, Footer, Login, Notifications].forEach(component => expect(wrapper.find(component)).toHaveLength(1));
    expect(wrapper.find(CourseList)).toHaveLength(0);
  });
  it('renders courses instead of login when logged in', () => {
    wrapper = shallow(<App isLoggedIn />);
    expect(wrapper.find(CourseList)).toHaveLength(1);
    expect(wrapper.find(Login)).toHaveLength(0);
  });
  it('passes Redux drawer props and callbacks to Notifications', () => {
    const display = jest.fn(); const hide = jest.fn();
    wrapper = shallow(<App displayDrawer displayNotificationDrawer={display} hideNotificationDrawer={hide} />);
    const notifications = wrapper.find(Notifications);
    expect(notifications.prop('displayDrawer')).toBe(true);
    notifications.prop('handleDisplayDrawer')(); notifications.prop('handleHideDrawer')();
    expect(display).toHaveBeenCalledTimes(1); expect(hide).toHaveBeenCalledTimes(1);
  });
  it('passes the login action to the form', () => {
    const login = jest.fn(); wrapper = shallow(<App login={login} />);
    expect(wrapper.find(Login).prop('logIn')).toBe(login);
  });
});
describe('mapStateToProps', () => {
  it('maps Immutable UI state to component props', () => {
    const ui = fromJS({ isUserLoggedIn: true, isNotificationDrawerVisible: true });
    expect(mapStateToProps({ ui })).toEqual({ isLoggedIn: true, displayDrawer: true });
  });
});
