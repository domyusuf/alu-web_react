import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';

describe('<App />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists()).toBe(true);
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
});

describe('when isLoggedIn is true', () => {
  it('verifies Login component is not included', () => {
    const wrapper = shallow(<App isLoggedIn={true} />);
    expect(wrapper.find(Login)).toHaveLength(0);
  });

  it('verifies CourseList component is included', () => {
    const wrapper = shallow(<App isLoggedIn={true} />);
    expect(wrapper.find(CourseList)).toHaveLength(1);
  });
});

describe('when ctrl+h is pressed', () => {
  it('calls logOut function and alerts "Logging you out"', () => {
    const events = {};
    document.addEventListener = jest.fn((event, cb) => {
      events[event] = cb;
    });

    const logOutMock = jest.fn();
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
    shallow(<App logOut={logOutMock} />);
    
    events.keydown({ ctrlKey: true, key: 'h' });
    
    expect(alertMock).toHaveBeenCalledWith('Logging you out');
    expect(logOutMock).toHaveBeenCalled();
    
    alertMock.mockRestore();
    jest.restoreAllMocks();
  });
});
