import React from 'react';
import { shallow } from 'enzyme';
import { fromJS, Map } from 'immutable';
import Notifications from './Notifications';
import NotificationItem from './NotificationItem';

const messages = fromJS([{ guid: 'a', type: 'urgent', value: 'Message', isRead: false }]);
describe('Notifications', () => {
  it('hides the panel until the drawer opens', () => {
    const wrapper = shallow(<Notifications />);
    expect(wrapper.find('[data-testid="notifications-panel"]')).toHaveLength(0);
    wrapper.setProps({ displayDrawer: true });
    expect(wrapper.find('[data-testid="notifications-panel"]')).toHaveLength(1);
    expect(wrapper.text()).toContain('No new notification for now');
  });
  it('renders Immutable messages and passes their guid to the read action', () => {
    const markNotificationAsRead = jest.fn();
    const wrapper = shallow(<Notifications displayDrawer listNotifications={messages} markNotificationAsRead={markNotificationAsRead} />);
    expect(wrapper.find(NotificationItem)).toHaveLength(1);
    const item = wrapper.find(NotificationItem);
    expect(item.prop('id')).toBe('a'); expect(item.prop('value')).toBe('Message');
    item.prop('markAsRead')(item.prop('id'));
    expect(markNotificationAsRead).toHaveBeenCalledWith('a');
  });
  it('forwards drawer callbacks', () => {
    const show = jest.fn(); const hide = jest.fn();
    const wrapper = shallow(<Notifications displayDrawer handleDisplayDrawer={show} handleHideDrawer={hide} />);
    wrapper.find('[data-testid="notifications-menu"]').simulate('click');
    wrapper.find('[aria-label="Close"]').simulate('click');
    expect(show).toHaveBeenCalledTimes(1); expect(hide).toHaveBeenCalledTimes(1);
  });

});

describe('notification filter buttons', () => {
  it('dispatches URGENT from the urgent button', () => {
    const setNotificationFilter = jest.fn();
    const wrapper = shallow(<Notifications displayDrawer setNotificationFilter={setNotificationFilter} />);
    wrapper.find('[aria-label="Urgent notifications"]').simulate('click');
    expect(setNotificationFilter).toHaveBeenCalledWith('URGENT');
  });
  it('dispatches DEFAULT even when there are no visible notifications', () => {
    const setNotificationFilter = jest.fn();
    const wrapper = shallow(<Notifications displayDrawer setNotificationFilter={setNotificationFilter} />);
    wrapper.find('[aria-label="All unread notifications"]').simulate('click');
    expect(setNotificationFilter).toHaveBeenCalledWith('DEFAULT');
  });
});
