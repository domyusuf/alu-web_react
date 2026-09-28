import React from 'react';
import { mount, shallow } from 'enzyme';
import Footer from './Footer';
import AppContext from '../App/AppContext';

describe('<Footer />', () => {
  it('renders without crashing', () => {
    shallow(<Footer />);
  });

  it('renders the text "Copyright"', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.text()).toContain('Copyright');
  });

  it('does not render Contact us for a logged out user', () => {
    const wrapper = mount(<Footer />);
    expect(wrapper.text()).not.toContain('Contact us');
    wrapper.unmount();
  });

  it('renders Contact us for a logged in user', () => {
    const wrapper = mount(
      <AppContext.Provider value={{
        user: { email: 'student@example.com', password: 'password', isLoggedIn: true },
        logOut: jest.fn()
      }}>
        <Footer />
      </AppContext.Provider>
    );
    expect(wrapper.text()).toContain('Contact us');
    wrapper.unmount();
  });
});
