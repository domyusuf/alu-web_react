import { Map } from 'immutable';
import {
  FETCH_NOTIFICATIONS_SUCCESS,
  MARK_AS_READ,
  SET_TYPE_FILTER,
  NotificationTypeFilters,
} from '../actions/notificationActionTypes';
import notificationReducer from '../reducers/notificationReducer';
import {
  filterTypeSelected,
  getNotifications,
  getUnreadNotifications,
} from './notificationSelector';

const data = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', value: 'New data available' },
];

describe('notification selectors', () => {
  const loadedState = notificationReducer(undefined, {
    type: FETCH_NOTIFICATIONS_SUCCESS,
    data,
  });

  it('filterTypeSelected returns the current filter', () => {
    const state = notificationReducer(loadedState, {
      type: SET_TYPE_FILTER,
      filter: NotificationTypeFilters.URGENT,
    });
    expect(filterTypeSelected(state)).toBe('URGENT');
  });

  it('getNotifications returns the notification Map', () => {
    const result = getNotifications(loadedState);
    expect(Map.isMap(result)).toBe(true);
    expect(result.size).toBe(3);
    expect(result.getIn(['1', 'value'])).toBe('New course available');
  });

  it('getUnreadNotifications returns only unread notifications', () => {
    const state = notificationReducer(loadedState, { type: MARK_AS_READ, index: 2 });
    const result = getUnreadNotifications(state);
    expect(Map.isMap(result)).toBe(true);
    expect(result.size).toBe(2);
    expect(result.has('2')).toBe(false);
  });
});
