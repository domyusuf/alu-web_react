import React from 'react';
import { render, fireEvent, screen, waitFor, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import rootReducer from '../reducers/rootReducer';
import notifications from '../../dist/notifications.json';
import courses from '../../dist/courses.json';
import user from '../../dist/login-success.json';

describe('connected dashboard flows', () => {
  const originalFetch = global.fetch;
  let errorSpy;
  let warnSpy;
  beforeEach(() => {
    const responses = { '/notifications.json': notifications, '/courses.json': courses, '/login-success.json': user };
    global.fetch = jest.fn(url => Promise.resolve({ ok: true, json: () => Promise.resolve(responses[url]) }));
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });
  afterEach(() => {
    cleanup(); global.fetch = originalFetch;
    const errors = errorSpy.mock.calls; const warnings = warnSpy.mock.calls;
    errorSpy.mockRestore(); warnSpy.mockRestore();
    expect(errors).toEqual([]); expect(warnings).toEqual([]);
  });
  it('loads, filters and marks notifications read, then logs in, selects courses and logs out', async () => {
    const store = createStore(rootReducer, applyMiddleware(thunk));
    render(<Provider store={store}><App /></Provider>);
    await waitFor(() => expect(store.getState().notifications.get('messages').size).toBe(notifications.length));
    fireEvent.click(screen.getByTestId('notifications-menu'));
    const unread = notifications.filter(item => !item.context.isRead);
    expect(screen.getAllByRole('listitem')).toHaveLength(unread.length);
    fireEvent.click(screen.getByRole('button', { name: 'Urgent notifications' }));
    const urgent = unread.filter(item => item.context.type === 'urgent');
    expect(screen.getAllByRole('listitem')).toHaveLength(urgent.length);
    fireEvent.click(screen.getByText(urgent[0].context.value.trim()));
    expect(store.getState().notifications.getIn(['messages', urgent[0].context.guid, 'isRead'])).toBe(true);
    expect(screen.getAllByRole('listitem')).toHaveLength(urgent.length - 1);
    fireEvent.click(screen.getByRole('button', { name: 'All unread notifications' }));
    expect(screen.getAllByRole('listitem')).toHaveLength(unread.length - 1);
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByTestId('notifications-panel')).toBeNull();
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'student@example.com' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'demo' } });
    fireEvent.click(screen.getByDisplayValue('OK'));
    await screen.findByRole('checkbox', { name: 'Select ES6' });
    expect(store.getState().ui.get('isUserLoggedIn')).toBe(true);
    expect(screen.getByText(/Welcome student@example.com/)).toBeTruthy();
    const checkbox = screen.getByRole('checkbox', { name: 'Select ES6' });
    fireEvent.click(checkbox);
    expect(store.getState().courses.getIn(['1', 'isSelected'])).toBe(true);
    expect(checkbox.checked).toBe(true);
    fireEvent.click(checkbox);
    expect(store.getState().courses.getIn(['1', 'isSelected'])).toBe(false);
    expect(checkbox.checked).toBe(false);
    fireEvent.click(screen.getByText('logout'));
    expect(store.getState().ui.get('user')).toBeNull();
    expect(screen.queryByRole('checkbox')).toBeNull();
    expect(screen.getByLabelText('Email:')).toBeTruthy();
  });
  it('handles a failed login without showing courses or authenticated header content', async () => {
    global.fetch = jest.fn(url => url === '/login-success.json'
      ? Promise.resolve({ ok: false })
      : Promise.resolve({ ok: true, json: () => Promise.resolve(notifications) }));
    const store = createStore(rootReducer, applyMiddleware(thunk));
    render(<Provider store={store}><App /></Provider>);
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'student@example.com' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'demo' } });
    fireEvent.click(screen.getByDisplayValue('OK'));
    await waitFor(() => expect(store.getState().ui.get('user')).toBeNull());
    expect(store.getState().ui.get('isUserLoggedIn')).toBe(false);
    expect(screen.queryByText('logout')).toBeNull();
    expect(screen.queryByRole('checkbox')).toBeNull();
  });
});
