import { Map, fromJS } from 'immutable';
import { FETCH_NOTIFICATIONS_SUCCESS, MARK_AS_READ, SET_TYPE_FILTER, SET_LOADING_STATE, NotificationTypeFilters } from '../actions/notificationActionTypes';
import { notificationsNormalizer } from '../schema/notifications';

export const initialState = Map({ notifications: Map(), messages: Map(), users: Map(), filter: NotificationTypeFilters.DEFAULT, loading: false });
export default function notificationReducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_NOTIFICATIONS_SUCCESS:
      return state.mergeDeep(fromJS(notificationsNormalizer(action.data).entities));
    case MARK_AS_READ:
      if (!state.hasIn(['messages', String(action.index)])) return state;
      return state.setIn(['messages', String(action.index), 'isRead'], true);
    case SET_TYPE_FILTER:
      return state.set('filter', action.filter);
    case SET_LOADING_STATE:
      return state.set('loading', action.loading);
    default:
      return state;
  }
}
export { notificationReducer };
