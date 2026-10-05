import { SELECT_COURSE, UNSELECT_COURSE } from './courseActionTypes';
import { selectCourse, unSelectCourse } from './courseActionCreators';

describe('course action creators', () => {
  it('creates a SELECT_COURSE action', () => {
    expect(selectCourse(1)).toEqual({ type: SELECT_COURSE, index: 1 });
  });

  it('creates an UNSELECT_COURSE action', () => {
    expect(unSelectCourse(1)).toEqual({ type: UNSELECT_COURSE, index: 1 });
  });
});

describe('fetchCourses', () => {
  const { fetchCourses, setCourses } = require('./courseActionCreators');
  const originalFetch = global.fetch;
  afterEach(() => { global.fetch = originalFetch; });
  it('fetches the course fixture and dispatches setCourses', async () => {
    const data = [{ id: '1', name: 'ES6', credit: 60 }];
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve(data) });
    const dispatch = jest.fn(); await fetchCourses()(dispatch);
    expect(global.fetch).toHaveBeenCalledWith('/courses.json');
    expect(dispatch).toHaveBeenCalledWith(setCourses(data));
  });
  it('does not dispatch success for an HTTP failure', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false });
    const dispatch = jest.fn(); await fetchCourses()(dispatch);
    expect(dispatch).not.toHaveBeenCalled();
  });
});
