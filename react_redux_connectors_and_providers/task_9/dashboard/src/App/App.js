import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import Notifications from '../Notifications/NotificationsContainer';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import { displayNotificationDrawer, hideNotificationDrawer, loginRequest, logout } from '../actions/uiActionCreators';
const styles = StyleSheet.create({
  app: { fontFamily: 'sans-serif' },
  body: { minHeight: 'calc(100vh - 320px)' },
  footer: { borderTop: '3px solid #e0354b', width: '100%', textAlign: 'center', fontStyle: 'italic' },
});
export class App extends React.Component {
  handleKeyDown = (event) => {
    if (event.ctrlKey && event.key === 'h') {
      event.preventDefault();
      alert('Logging you out');
      this.props.logout();
    }
  };
  componentDidMount() { document.addEventListener('keydown', this.handleKeyDown); }
  componentWillUnmount() { document.removeEventListener('keydown', this.handleKeyDown); }
  render() {
    const { isLoggedIn } = this.props;
    return (
      <React.Fragment>
        <Notifications
          displayDrawer={this.props.displayDrawer}
          handleDisplayDrawer={this.props.displayNotificationDrawer}
          handleHideDrawer={this.props.hideNotificationDrawer}

        />
        <div className={`App ${css(styles.app)}`}>
          <Header />
          <main className={css(styles.body)}>
            {isLoggedIn ? (
              <BodySectionWithMarginBottom title="Course list">
                <CourseList  />
              </BodySectionWithMarginBottom>
            ) : (
              <BodySectionWithMarginBottom title="Log in to continue">
                <Login logIn={this.props.login} />
              </BodySectionWithMarginBottom>
            )}
            <BodySection title="News from the School">
              <p>Stay informed about the latest news from the School.</p>
            </BodySection>
          </main>
          <div className={css(styles.footer)}><Footer /></div>
        </div>
      </React.Fragment>
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
    isLoggedIn: state.ui.get('isUserLoggedIn'),
    displayDrawer: state.ui.get('isNotificationDrawerVisible'),
  };
}
export const mapDispatchToProps = { displayNotificationDrawer, hideNotificationDrawer, login: loginRequest, logout };
export default connect(mapStateToProps, mapDispatchToProps)(App);
