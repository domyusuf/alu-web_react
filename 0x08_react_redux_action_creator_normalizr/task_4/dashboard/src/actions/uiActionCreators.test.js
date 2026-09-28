
import {
  LOGIN,
  LOGOUT,
  DISPLAY_NOTIFICATION_DRAWER,
  HIDE_NOTIFICATION_DRAWER,
} from './uiActionTypes';
import {
  login,
  logout,
  displayNotificationDrawer,
  hideNotificationDrawer,
} from './uiActionCreators';

describe('UI action creators', () => {
  it('creates a LOGIN action', () => {
    expect(login('user@example.com', 'secret')).toEqual({
      type: LOGIN,
      user: { email: 'user@example.com', password: 'secret' },
    });
  });

  it('creates a LOGOUT action', () => {
    expect(logout()).toEqual({ type: LOGOUT });
  });

  it('creates a DISPLAY_NOTIFICATION_DRAWER action', () => {
    expect(displayNotificationDrawer()).toEqual({ type: DISPLAY_NOTIFICATION_DRAWER });
  });

  it('creates a HIDE_NOTIFICATION_DRAWER action', () => {
    expect(hideNotificationDrawer()).toEqual({ type: HIDE_NOTIFICATION_DRAWER });
  });
});
