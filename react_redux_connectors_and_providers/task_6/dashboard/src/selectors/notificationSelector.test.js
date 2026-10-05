import { Map } from 'immutable';
import reducer from '../reducers/notificationReducer';
import data from '../../dist/notifications.json';
import { filterTypeSelected, getNotifications, getUnreadNotifications } from './notificationSelector';

describe('notification selectors', () => {
  const state = reducer(undefined, { type: 'FETCH_NOTIFICATIONS_SUCCESS', data });
  it('returns the current filter', () => { expect(filterTypeSelected(state)).toBe('DEFAULT'); });
  it('returns normalized message entities', () => {
    expect(Map.isMap(getNotifications(state))).toBe(true);
    expect(getNotifications(state).size).toBe(data.length);
  });
  it('returns only unread messages', () => {
    const result = getUnreadNotifications(state);
    expect(result.size).toBe(data.filter(item => !item.context.isRead).length);
    expect(result.every(item => !item.get('isRead'))).toBe(true);
  });
});
