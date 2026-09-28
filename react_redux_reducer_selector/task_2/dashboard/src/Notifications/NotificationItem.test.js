import React from 'react';
import { shallow } from 'enzyme';
import NotificationItem from './NotificationItem';

describe('<NotificationItem />', () => {
  it('renders without crashing', () => {
    shallow(<NotificationItem />);
  });

  it('renders correct html with dummy type and value props', () => {
    const wrapper = shallow(<NotificationItem type="default" value="test" />);
    expect(wrapper.prop('data-notification-type')).toEqual('default');
    expect(wrapper.text()).toEqual('test');
  });

  it('renders correct html with dummy html prop', () => {
    const wrapper = shallow(<NotificationItem html={{ __html: '<u>test</u>' }} />);
    expect(wrapper.html()).toContain('<u>test</u>');
  });

  it('calls markAsRead with the notification id when clicked', () => {
    const markAsRead = jest.fn();
    const wrapper = shallow(
      <NotificationItem id={7} type="default" value="test" markAsRead={markAsRead} />
    );

    wrapper.simulate('click');

    expect(markAsRead).toHaveBeenCalledWith(7);
  });
});
