import {
  MARK_AS_READ,
  SET_TYPE_FILTER,
  NotificationTypeFilters,
} from './notificationActionTypes';
import { markAsAread, markAsARead, setNotificationFilter } from './notificationActionCreators';

describe('notification action creators', () => {
  it('creates a MARK_AS_READ action', () => {
    expect(markAsAread(1)).toEqual({ type: MARK_AS_READ, index: 1 });
    expect(markAsARead(1)).toEqual({ type: MARK_AS_READ, index: 1 });
  });

  it('creates a SET_TYPE_FILTER action', () => {
    expect(setNotificationFilter(NotificationTypeFilters.DEFAULT)).toEqual({
      type: SET_TYPE_FILTER,
      filter: 'DEFAULT',
    });
  });
});

describe('async notifications', () => {
  const { setLoadingState, setNotifications, fetchNotifications } = require('./notificationActionCreators');
  const data = require('../../dist/notifications.json');
  const originalFetch = global.fetch;
  afterEach(() => { global.fetch = originalFetch; });
  it('creates SET_LOADING_STATE and FETCH_NOTIFICATIONS_SUCCESS actions', () => {
    expect(setLoadingState(true)).toEqual({ type: 'SET_LOADING_STATE', loading: true });
    expect(setNotifications(data)).toEqual({ type: 'FETCH_NOTIFICATIONS_SUCCESS', data });
  });
  it('fetches notifications and brackets success with loading actions', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve(data) });
    const dispatch = jest.fn(); await fetchNotifications()(dispatch);
    expect(global.fetch).toHaveBeenCalledWith('/notifications.json');
    expect(dispatch.mock.calls.map(([action]) => action)).toEqual([
      setLoadingState(true), setNotifications(data), setLoadingState(false),
    ]);
  });
  it('resets loading after a rejected request without reporting success', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Offline'));
    const dispatch = jest.fn(); await fetchNotifications()(dispatch);
    expect(dispatch.mock.calls.map(([action]) => action)).toEqual([setLoadingState(true), setLoadingState(false)]);
  });
});
