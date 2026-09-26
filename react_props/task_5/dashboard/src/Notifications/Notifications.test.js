import React from 'react';
import { shallow } from 'enzyme';
import Notifications from './Notifications';
import NotificationItem from './NotificationItem';

describe('<Notifications />', () => {
  describe('Notifications rendering behavior', () => {
    it('renders without crashing', () => {
      const wrapper = shallow(<Notifications />);
      expect(wrapper.exists()).toBe(true);
    });

    it('menu item is being displayed when displayDrawer is false', () => {
      const wrapper = shallow(<Notifications displayDrawer={false} />);
      expect(wrapper.find('.menuItem')).toHaveLength(1);
    });

    it('div.Notifications is not being displayed when displayDrawer is false', () => {
      const wrapper = shallow(<Notifications displayDrawer={false} />);
      expect(wrapper.find('.Notifications')).toHaveLength(0);
    });

    it('menu item is being displayed when displayDrawer is true', () => {
      const wrapper = shallow(<Notifications displayDrawer={true} />);
      expect(wrapper.find('.menuItem')).toHaveLength(1);
    });

    it('div.Notifications is being displayed when displayDrawer is true', () => {
      const wrapper = shallow(<Notifications displayDrawer={true} />);
      expect(wrapper.find('.Notifications')).toHaveLength(1);
    });
  });

  describe('With listNotifications Empty', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Notifications displayDrawer={true} listNotifications={[]} />);
    });

    it('renders correctly if you pass an empty array or if you don\'t pass the listNotifications property', () => {
      const noPropWrapper = shallow(<Notifications displayDrawer={true} />);
      expect(noPropWrapper.find(NotificationItem)).toHaveLength(0);
      expect(wrapper.find(NotificationItem)).toHaveLength(0);
    });

    it('verify that when listNotifications is empty the message Here is the list of notifications is not displayed, but No new notification for now is', () => {
      expect(wrapper.text()).not.toContain('Here is the list of notifications');
      expect(wrapper.text()).toContain('No new notification for now');
    });
  });

  describe('With listNotifications containing elements', () => {
    let wrapper;
    const notifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' } }
    ];

    beforeEach(() => {
      wrapper = shallow(<Notifications displayDrawer={true} listNotifications={notifications} />);
    });

    it('renders it correctly and with the right number of NotificationItem', () => {
      expect(wrapper.find(NotificationItem)).toHaveLength(3);
    });
  });
});
