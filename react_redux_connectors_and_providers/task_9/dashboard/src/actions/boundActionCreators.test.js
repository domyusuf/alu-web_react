
import { bindCourseActionCreators } from './courseActionCreators';
import { bindNotificationActionCreators } from './notificationActionCreators';
import { bindUIActionCreators } from './uiActionCreators';

describe('bound action creators', () => {
  it('dispatches course actions', () => {
    const dispatch = jest.fn();
    bindCourseActionCreators(dispatch).selectCourse(3);
    expect(dispatch).toHaveBeenCalledWith({ type: 'SELECT_COURSE', index: 3 });
  });

  it('dispatches notification actions', () => {
    const dispatch = jest.fn();
    bindNotificationActionCreators(dispatch).markAsAread(4);
    expect(dispatch).toHaveBeenCalledWith({ type: 'MARK_AS_READ', index: 4 });
  });

  it('dispatches UI actions', () => {
    const dispatch = jest.fn();
    bindUIActionCreators(dispatch).logout();
    expect(dispatch).toHaveBeenCalledWith({ type: 'LOGOUT' });
  });
});
