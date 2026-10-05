import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { NotificationsContainer, mapStateToProps } from './NotificationsContainer';
import Notifications from './Notifications';

describe('NotificationsContainer', () => {
  it('fetches once on mount and passes presentation props through', () => {
    const fetchNotifications = jest.fn(); const markNotificationAsRead = jest.fn();
    const wrapper = shallow(<NotificationsContainer displayDrawer fetchNotifications={fetchNotifications} markNotificationAsRead={markNotificationAsRead} />);
    expect(fetchNotifications).toHaveBeenCalledTimes(1);
    expect(wrapper.find(Notifications).prop('displayDrawer')).toBe(true);
    expect(wrapper.find(Notifications).prop('markNotificationAsRead')).toBe(markNotificationAsRead);
    wrapper.setProps({ displayDrawer: false });
    expect(fetchNotifications).toHaveBeenCalledTimes(1);
  });
  it('selects only unread urgent messages when requested', () => {
    const state = { notifications: fromJS({ filter: 'URGENT', messages: {
      a: { guid: 'a', type: 'urgent', isRead: false }, b: { guid: 'b', type: 'default', isRead: false },
    } }) };
    expect(mapStateToProps(state).listNotifications.map(item => item.get('guid')).toJS()).toEqual(['a']);
  });
});
