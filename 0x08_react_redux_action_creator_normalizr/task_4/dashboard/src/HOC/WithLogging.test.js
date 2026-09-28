import React from 'react';
import { mount } from 'enzyme';
import WithLogging from './WithLogging';
import Login from '../Login/Login';

describe('WithLogging HOC', () => {
  let logSpy;

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  it('logs Component when wrapping an anonymous HTML component', () => {
    const HtmlComponent = WithLogging(() => <p />);
    const wrapper = mount(<HtmlComponent />);

    expect(logSpy).toHaveBeenCalledWith('Component Component is mounted');

    wrapper.unmount();
    expect(logSpy).toHaveBeenCalledWith('Component Component is going to unmount');
  });

  it('logs the component name when wrapping Login', () => {
    const LoginWithLogging = WithLogging(Login);
    const wrapper = mount(<LoginWithLogging />);

    expect(logSpy).toHaveBeenCalledWith('Component Login is mounted');

    wrapper.unmount();
    expect(logSpy).toHaveBeenCalledWith('Component Login is going to unmount');
  });
});
