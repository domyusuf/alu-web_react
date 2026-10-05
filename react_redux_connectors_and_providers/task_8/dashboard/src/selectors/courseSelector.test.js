import { fromJS, List, Map } from 'immutable';
import { getListCourses } from './courseSelector';
it('returns all course entities as an Immutable List', () => {
  const courses = fromJS({ '1': { id: '1', name: 'ES6', credit: 60 }, '2': { id: '2', name: 'Webpack', credit: 20 } });
  expect(getListCourses(courses)).toEqual(List([courses.get('1'), courses.get('2')]));
  expect(getListCourses(Map())).toEqual(List());
});
