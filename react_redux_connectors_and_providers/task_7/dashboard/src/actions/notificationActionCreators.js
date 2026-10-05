import { MARK_AS_READ, SET_TYPE_FILTER, SET_LOADING_STATE, FETCH_NOTIFICATIONS_SUCCESS } from './notificationActionTypes';

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

export function setLoadingState(loading) { return { type: SET_LOADING_STATE, loading }; }
export function setNotifications(data) { return { type: FETCH_NOTIFICATIONS_SUCCESS, data }; }
export function fetchNotifications() {
  return (dispatch) => {
    dispatch(setLoadingState(true));
    return fetch('/notifications.json')
      .then(response => {
        if (response.ok === false) throw new Error('Unable to load notifications');
        return response.json();
      })
      .then(data => dispatch(setNotifications(data)))
      .catch(() => undefined)
      .finally(() => dispatch(setLoadingState(false)));
  };
}
