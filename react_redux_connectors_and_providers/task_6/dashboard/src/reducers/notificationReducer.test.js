import { Map } from 'immutable';
import reducer from './notificationReducer';
import data from '../../dist/notifications.json';

describe('notificationReducer', () => {
  it('initializes entity maps, DEFAULT filter and loading false', () => {
    const state = reducer();
    ['notifications', 'messages', 'users'].forEach(key => expect(Map.isMap(state.get(key))).toBe(true));
    expect(state.get('filter')).toBe('DEFAULT'); expect(state.get('loading')).toBe(false);
  });
  it('deep merges normalized API entities and preserves their read flags', () => {
    const state = reducer(undefined, { type: 'FETCH_NOTIFICATIONS_SUCCESS', data });
    const first = data[0];
    expect(state.getIn(['messages', first.context.guid, 'isRead'])).toBe(first.context.isRead);
    expect(state.getIn(['notifications', first.id, 'context'])).toBe(first.context.guid);
    const merged = reducer(state, { type: 'FETCH_NOTIFICATIONS_SUCCESS', data: [{ ...first, context: { guid: first.context.guid, value: 'Updated' } }] });
    expect(merged.getIn(['messages', first.context.guid, 'value'])).toBe('Updated');
    expect(merged.getIn(['messages', first.context.guid, 'type'])).toBe(first.context.type);
    expect(merged.get('messages').size).toBe(state.get('messages').size);
  });
  it('marks the selected message as read without mutating prior state', () => {
    const state = reducer(undefined, { type: 'FETCH_NOTIFICATIONS_SUCCESS', data });
    const id = data[1].context.guid;
    expect(reducer(state, { type: 'MARK_AS_READ', index: id }).getIn(['messages', id, 'isRead'])).toBe(true);
    expect(state.getIn(['messages', id, 'isRead'])).toBe(false);
    expect(reducer(state, { type: 'MARK_AS_READ', index: 'missing' })).toBe(state);
  });
  it('handles SET_LOADING_STATE', () => {
    const loading = reducer(undefined, { type: 'SET_LOADING_STATE', loading: true });
    expect(loading.get('loading')).toBe(true);
    expect(reducer(loading, { type: 'SET_LOADING_STATE', loading: false }).get('loading')).toBe(false);
  });
  it('changes the selected filter', () => {
    expect(reducer(undefined, { type: 'SET_TYPE_FILTER', filter: 'URGENT' }).get('filter')).toBe('URGENT');
  });
});
