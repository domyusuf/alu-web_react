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
      expect(wrapper.find('[data-testid="notifications-menu"]')).toHaveLength(1);
    });

    it('div.Notifications is not being displayed when displayDrawer is false', () => {
      const wrapper = shallow(<Notifications displayDrawer={false} />);
      expect(wrapper.find('[data-testid="notifications-panel"]')).toHaveLength(0);
    });

    it('menu item is being displayed when displayDrawer is true', () => {
      const wrapper = shallow(<Notifications displayDrawer={true} />);
      expect(wrapper.find('[data-testid="notifications-menu"]')).toHaveLength(1);
    });

    it('div.Notifications is being displayed when displayDrawer is true', () => {
      const wrapper = shallow(<Notifications displayDrawer={true} />);
      expect(wrapper.find('[data-testid="notifications-panel"]')).toHaveLength(1);
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

  it('does not rerender when props keep the same references', () => {
    const notifications = [
      { id: 1, type: 'default', value: 'New course available' }
    ];
    const wrapper = shallow(
      <Notifications displayDrawer={true} listNotifications={notifications} />
    );
    const renderSpy = jest.spyOn(wrapper.instance(), 'render');

    wrapper.setProps({ listNotifications: notifications });

    expect(renderSpy).not.toHaveBeenCalled();
    renderSpy.mockRestore();
  });

  it('passes markNotificationAsRead to each notification item', () => {
    const markNotificationAsRead = jest.fn();
    const notifications = [{ id: 1, type: 'default', value: 'New course available' }];
    const wrapper = shallow(
      <Notifications
        displayDrawer={true}
        listNotifications={notifications}
        markNotificationAsRead={markNotificationAsRead}
      />
    );
    wrapper.find(NotificationItem).prop('markAsRead')(1);
    expect(markNotificationAsRead).toHaveBeenCalledWith(1);
  });

  it('rerenders when the notification list becomes longer', () => {
    const notifications = [
      { id: 1, type: 'default', value: 'New course available' }
    ];
    const wrapper = shallow(
      <Notifications displayDrawer={true} listNotifications={notifications} />
    );
    const renderSpy = jest.spyOn(wrapper.instance(), 'render');

    wrapper.setProps({
      listNotifications: [
        ...notifications,
        { id: 2, type: 'urgent', value: 'New resume available' }
      ]
    });

    expect(renderSpy).toHaveBeenCalled();
    renderSpy.mockRestore();
  });

  it('calls handleDisplayDrawer when the menu item is clicked', () => {
    const handleDisplayDrawer = jest.fn();
    const wrapper = shallow(
      <Notifications handleDisplayDrawer={handleDisplayDrawer} />
    );

    wrapper.find('[data-testid="notifications-menu"]').simulate('click');
    expect(handleDisplayDrawer).toHaveBeenCalledTimes(1);
  });

  it('calls handleHideDrawer when the close button is clicked', () => {
    const handleHideDrawer = jest.fn();
    const wrapper = shallow(
      <Notifications displayDrawer={true} handleHideDrawer={handleHideDrawer} />
    );

    wrapper.find('button[aria-label="Close"]').simulate('click');
    expect(handleHideDrawer).toHaveBeenCalledTimes(1);
  });
});
