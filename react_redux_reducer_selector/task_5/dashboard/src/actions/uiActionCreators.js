
import { bindActionCreators } from 'redux';
import {
  LOGIN,
  LOGOUT,
  DISPLAY_NOTIFICATION_DRAWER,
  HIDE_NOTIFICATION_DRAWER,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from './uiActionTypes';

export function login(email, password) {
  return { type: LOGIN, user: { email, password } };
}

export function logout() {
  return { type: LOGOUT };
}

export function displayNotificationDrawer() {
  return { type: DISPLAY_NOTIFICATION_DRAWER };
}

export function hideNotificationDrawer() {
  return { type: HIDE_NOTIFICATION_DRAWER };
}

export function loginSuccess() {
  return { type: LOGIN_SUCCESS };
}

export function loginFailure() {
  return { type: LOGIN_FAILURE };
}

export function loginRequest(email, password) {
  return (dispatch) => {
    dispatch(login(email, password));

    return fetch('/login-success.json')
      .then((response) => {
        if (response.ok === false) {
          throw new Error('Login request failed');
        }
        return response.json();
      })
      .then(() => dispatch(loginSuccess()))
      .catch(() => dispatch(loginFailure()));
  };
}

export function bindUIActionCreators(dispatch) {
  return bindActionCreators(
    {
      login,
      logout,
      displayNotificationDrawer,
      hideNotificationDrawer,
      loginRequest,
    },
    dispatch
  );
}
