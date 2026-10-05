
import { MARK_AS_READ, SET_TYPE_FILTER } from './notificationActionTypes';

export function markAsAread(index) {
  return { type: MARK_AS_READ, index };
}

export const markAsARead = markAsAread;

export function setNotificationFilter(filter) {
  return { type: SET_TYPE_FILTER, filter };
}


import { bindActionCreators } from 'redux';

export function bindNotificationActionCreators(dispatch) {
  return bindActionCreators({ markAsAread, setNotificationFilter }, dispatch);
}
