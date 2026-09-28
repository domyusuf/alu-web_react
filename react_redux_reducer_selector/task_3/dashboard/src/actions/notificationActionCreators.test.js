
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
