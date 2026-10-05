import { fromJS } from 'immutable';
import { filterTypeSelected, getNotifications, getUnreadNotificationsByType } from './notificationSelector';
const state = fromJS({ filter: 'DEFAULT', loading: false, messages: {
  a: { guid: 'a', type: 'urgent', isRead: false },
  b: { guid: 'b', type: 'default', isRead: false },
  c: { guid: 'c', type: 'urgent', isRead: true },
} });
describe('memoized notification selector', () => {
  it('exposes the current filter and messages', () => {
    expect(filterTypeSelected(state)).toBe('DEFAULT');
    expect(getNotifications(state)).toBe(state.get('messages'));
  });
  it('returns every unread message under DEFAULT', () => {
    expect(getUnreadNotificationsByType(state).map(item => item.get('guid')).toJS()).toEqual(['a', 'b']);
  });
  it('returns only unread urgent messages under URGENT', () => {
    expect(getUnreadNotificationsByType(state.set('filter', 'URGENT')).map(item => item.get('guid')).toJS()).toEqual(['a']);
  });
  it('reuses the result when only unrelated state changes', () => {
    const result = getUnreadNotificationsByType(state);
    expect(getUnreadNotificationsByType(state.set('loading', true))).toBe(result);
  });
  it('recalculates after a notification becomes read', () => {
    const result = getUnreadNotificationsByType(state.setIn(['messages', 'a', 'isRead'], true));
    expect(result.map(item => item.get('guid')).toJS()).toEqual(['b']);
  });
});
