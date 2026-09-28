import { Map, List } from 'immutable';
import getFromJS from './0-fromjs';
import getMap from './1-map';
import accessNested from './2-nested';
import { getListObject, addElementToList } from './3-list';
import { map, map2 } from './4-mutations';
import { concatElements, mergeElements } from './5-merge';
import mergeDeeplyElements from './6-deeply';
import areMapsEqual from './7-equality';
import printBestStudents from './8-seq';

test('all immutable exercises behave as required', () => {
  expect(Map.isMap(getFromJS({ user: { name: 'Ada' } }))).toBe(true);
  expect(Map.isMap(getFromJS({ user: { name: 'Ada' } }).get('user'))).toBe(true);
  expect(getMap({ a: 1 }).get('a')).toBe(1);
  expect(accessNested({ name: { first: 'Guillaume' } }, ['name', 'first'])).toBe('Guillaume');
  const list = getListObject(['a']);
  expect(List.isList(list)).toBe(true);
  expect(addElementToList(list, 'b').toJS()).toEqual(['a', 'b']);
  expect(list.toJS()).toEqual(['a']);
  expect(map.get('2')).toBe('Noah');
  expect(map2.get('2')).toBe('Benjamin');
  expect(concatElements([1], [2]).toJS()).toEqual([1, 2]);
  expect(mergeElements({ a: 1 }, { a: 2, b: 3 }).toJS()).toEqual({ a: 2, b: 3 });
  expect(mergeDeeplyElements({ u: { likes: { 1: true } } }, { u: { likes: { 2: true } } }).toJS())
    .toEqual({ u: { likes: { 1: true, 2: true } } });
  expect(areMapsEqual(Map({ a: 1 }), Map({ a: 1 }))).toBe(true);
  const log = jest.spyOn(console, 'log').mockImplementation(() => {});
  printBestStudents({ 1: { score: 99, firstName: 'guillaume', lastName: 'salva' }, 2: { score: 60, firstName: 'low', lastName: 'score' } });
  expect(log).toHaveBeenCalledWith({ 1: { score: 99, firstName: 'Guillaume', lastName: 'Salva' } });
  log.mockRestore();
});
