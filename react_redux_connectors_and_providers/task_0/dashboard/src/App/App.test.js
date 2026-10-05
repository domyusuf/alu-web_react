import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { App, mapStateToProps } from './App';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import CourseList from '../CourseList/CourseList';
import Notifications from '../Notifications/Notifications';

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
  it('opens and closes its local drawer', () => {
    wrapper = shallow(<App />);
    wrapper.instance().handleDisplayDrawer();
    expect(wrapper.find(Notifications).prop('displayDrawer')).toBe(true);
    wrapper.instance().handleHideDrawer();
    expect(wrapper.find(Notifications).prop('displayDrawer')).toBe(false);
  });
  it('removes a local notification without changing the old list', () => {
    wrapper = shallow(<App />);
    const before = wrapper.state('listNotifications');
    wrapper.instance().markNotificationAsRead(2);
    expect(before).toHaveLength(3);
    expect(wrapper.state('listNotifications').map(item => item.id)).toEqual([1, 3]);
  });
});
describe('mapStateToProps', () => {
  it('maps Immutable UI state to component props', () => {
    const ui = fromJS({ isUserLoggedIn: true });
    expect(mapStateToProps(ui)).toEqual({ isLoggedIn: true });
  });
});
