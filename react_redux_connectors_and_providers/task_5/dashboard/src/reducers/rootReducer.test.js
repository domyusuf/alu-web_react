import { Map } from 'immutable';
import rootReducer from './rootReducer';
import { initialState as courses } from './courseReducer';
import { initialState as notifications } from './notificationReducer';
import { initialState as ui } from './uiReducer';

describe('rootReducer', () => {
  it('initializes courses, notifications and ui as Immutable Maps', () => {
    const state = rootReducer(undefined, {});
    expect(state).toEqual({ courses, notifications, ui });
    Object.values(state).forEach(slice => expect(Map.isMap(slice)).toBe(true));
  });
  it('routes UI actions without changing unrelated slices', () => {
    const before = rootReducer(undefined, {});
    const after = rootReducer(before, { type: 'DISPLAY_NOTIFICATION_DRAWER' });
    expect(after.ui.get('isNotificationDrawerVisible')).toBe(true);
    expect(after.courses).toBe(before.courses);
    expect(after.notifications).toBe(before.notifications);
  });
});
