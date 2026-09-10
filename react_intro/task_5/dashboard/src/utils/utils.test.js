import { getFullYear, getFooterCopy, getLatestNotification } from './utils';

describe('utils.js tests', () => {
  it('getFullYear returns the current year', () => {
    expect(getFullYear()).toBe(new Date().getFullYear());
  });

  it('getFooterCopy returns correct string when true', () => {
    expect(getFooterCopy(true)).toBe('Holberton School');
  });

  it('getFooterCopy returns correct string when false', () => {
    expect(getFooterCopy(false)).toBe('Holberton School main dashboard');
  });

  it('getLatestNotification returns the correct string', () => {
    expect(getLatestNotification()).toBe('<strong>Urgent requirement</strong> - complete by EOD');
  });
});
