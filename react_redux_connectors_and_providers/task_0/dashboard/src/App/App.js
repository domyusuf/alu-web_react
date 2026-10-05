import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import { getLatestNotification } from '../utils/utils';
import AppContext, { defaultUser } from './AppContext';
const styles = StyleSheet.create({
  app: { fontFamily: 'sans-serif' },
  body: { minHeight: 'calc(100vh - 320px)' },
  footer: { borderTop: '3px solid #e0354b', width: '100%', textAlign: 'center', fontStyle: 'italic' },
});
export class App extends React.Component {
  state = {
    displayDrawer: false,
    listNotifications: [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: getLatestNotification() } }
    ],
    value: { user: defaultUser, logOut: () => this.logOut() }
  };
  handleDisplayDrawer = () => this.setState({ displayDrawer: true });
  handleHideDrawer = () => this.setState({ displayDrawer: false });
  logIn = (email, password) => {
    this.setState(({ value }) => ({ value: { ...value, user: { email, password, isLoggedIn: true } } }));
  };
  logOut = () => this.setState(({ value }) => ({ value: { ...value, user: defaultUser } }));
  markNotificationAsRead = (id) => {
    this.setState(({ listNotifications }) => ({ listNotifications: listNotifications.filter(item => item.id !== id) }));
  };
  handleKeyDown = (event) => {
    if (event.ctrlKey && event.key === 'h') {
      event.preventDefault();
      alert('Logging you out');
      this.state.value.logOut();
    }
  };
  componentDidMount() { document.addEventListener('keydown', this.handleKeyDown); }
  componentWillUnmount() { document.removeEventListener('keydown', this.handleKeyDown); }
  render() {
    const { isLoggedIn } = this.props;
    return (
      <AppContext.Provider value={this.state.value}>
        <Notifications
          displayDrawer={this.state.displayDrawer}
          handleDisplayDrawer={this.handleDisplayDrawer}
          handleHideDrawer={this.handleHideDrawer}
          listNotifications={this.state.listNotifications}
          markNotificationAsRead={this.markNotificationAsRead}
        />
        <div className={`App ${css(styles.app)}`}>
          <Header />
          <main className={css(styles.body)}>
            {isLoggedIn ? (
              <BodySectionWithMarginBottom title="Course list">
                <CourseList listCourses={[{ id: 1, name: 'ES6', credit: 60 }, { id: 2, name: 'Webpack', credit: 20 }, { id: 3, name: 'React', credit: 40 }]} />
              </BodySectionWithMarginBottom>
            ) : (
              <BodySectionWithMarginBottom title="Log in to continue">
                <Login logIn={this.logIn} />
              </BodySectionWithMarginBottom>
            )}
            <BodySection title="News from the School">
              <p>Stay informed about the latest news from the School.</p>
            </BodySection>
          </main>
          <div className={css(styles.footer)}><Footer /></div>
        </div>
      </AppContext.Provider>
    );
  }
}
App.propTypes = {
  isLoggedIn: PropTypes.bool,
  displayDrawer: PropTypes.bool,
  displayNotificationDrawer: PropTypes.func,
  hideNotificationDrawer: PropTypes.func,
  login: PropTypes.func,
  logout: PropTypes.func,
};
App.defaultProps = {
  isLoggedIn: false, displayDrawer: false,
  displayNotificationDrawer: () => {}, hideNotificationDrawer: () => {},
  login: () => {}, logout: () => {},
};
export function mapStateToProps(state) {
  return {
    isLoggedIn: state.get('isUserLoggedIn'),

  };
}
export default connect(mapStateToProps)(App);
