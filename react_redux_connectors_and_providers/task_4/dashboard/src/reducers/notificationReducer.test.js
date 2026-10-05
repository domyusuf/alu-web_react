import { Map } from 'immutable';
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

describe('Immutable notificationReducer', () => {
  it('returns an Immutable state by default', () => {
    expect(Map.isMap(notificationReducer())).toBe(true);
    expect(notificationReducer().get('filter')).toBe('DEFAULT');
  });

  it('normalizes and loads notifications', () => {
    const state = notificationReducer(undefined, {
      type: FETCH_NOTIFICATIONS_SUCCESS,
      data: notifications,
    });
    expect(state.getIn(['notifications', '2', 'value'])).toBe('New resume available');
    expect(state.getIn(['notifications', '2', 'isRead'])).toBe(false);
  });

  it('marks a notification as read', () => {
    const loaded = notificationReducer(undefined, {
      type: FETCH_NOTIFICATIONS_SUCCESS,
      data: notifications,
    });
    const state = notificationReducer(loaded, { type: MARK_AS_READ, index: 2 });
    expect(state.getIn(['notifications', '2', 'isRead'])).toBe(true);
  });

  it('sets the filter', () => {
    const state = notificationReducer(undefined, {
      type: SET_TYPE_FILTER,
      filter: NotificationTypeFilters.URGENT,
    });
    expect(state.get('filter')).toBe('URGENT');
  });
});
