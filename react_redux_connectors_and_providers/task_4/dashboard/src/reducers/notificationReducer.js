import { Map, fromJS } from 'immutable';
import {
  FETCH_NOTIFICATIONS_SUCCESS,
  MARK_AS_READ,
  SET_TYPE_FILTER,
  NotificationTypeFilters,
} from '../actions/notificationActionTypes';
import { notificationsNormalizer } from '../schema/notifications';

export const initialState = Map({
  notifications: Map(),
  filter: NotificationTypeFilters.DEFAULT,
});

export function notificationKey(notifications, index) {
  return notifications.has(index) ? index : String(index);
}

export default function notificationReducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_NOTIFICATIONS_SUCCESS: {
      const notifications = action.data.map((item) => ({ ...item, isRead: false }));
      const entities = notificationsNormalizer(notifications).entities.notifications || {};
      return state.merge(fromJS({ notifications: entities }));
    }
    case MARK_AS_READ: {
      const notifications = state.get('notifications');
      return state.setIn(
        ['notifications', notificationKey(notifications, action.index), 'isRead'],
        true
      );
    }
    case SET_TYPE_FILTER:
      return state.set('filter', action.filter);
    default:
      return state;
  }
}

export { notificationReducer };
