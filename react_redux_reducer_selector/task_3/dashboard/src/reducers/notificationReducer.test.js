import {
  FETCH_NOTIFICATIONS_SUCCESS,
  MARK_AS_READ,
  SET_TYPE_FILTER,
  NotificationTypeFilters,
} from '../actions/notificationActionTypes';
import notificationReducer from './notificationReducer';

const notifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', value: 'New data available' },
];

describe('notificationReducer', () => {
  it('returns the default state', () => {
    expect(notificationReducer()).toEqual({ notifications: [], filter: 'DEFAULT' });
  });

  it('loads notifications with isRead set to false', () => {
    const state = notificationReducer(undefined, {
      type: FETCH_NOTIFICATIONS_SUCCESS,
      data: notifications,
    });
    expect(state.notifications).toEqual(
      notifications.map((notification) => ({ ...notification, isRead: false }))
    );
  });

  it('marks a notification as read', () => {
    const loaded = notificationReducer(undefined, {
      type: FETCH_NOTIFICATIONS_SUCCESS,
      data: notifications,
    });
    const state = notificationReducer(loaded, { type: MARK_AS_READ, index: 2 });
    expect(state.notifications[1].isRead).toBe(true);
  });

  it('sets the notification filter', () => {
    const state = notificationReducer(undefined, {
      type: SET_TYPE_FILTER,
      filter: NotificationTypeFilters.URGENT,
    });
    expect(state.filter).toBe('URGENT');
  });
});
