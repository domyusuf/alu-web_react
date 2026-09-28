import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import closeIcon from '../assets/close-icon.png';
import NotificationItem from './NotificationItem';
import NotificationItemShape from './NotificationItemShape';

const fadeIn = {
  from: {
    opacity: 0.5
  },
  to: {
    opacity: 1
  }
};

const bounce = {
  '0%': {
    transform: 'translateY(0px)'
  },
  '33%': {
    transform: 'translateY(-5px)'
  },
  '66%': {
    transform: 'translateY(5px)'
  },
  '100%': {
    transform: 'translateY(0px)'
  }
};

const styles = StyleSheet.create({
  menuItem: {
    backgroundColor: '#fff8f8',
    cursor: 'pointer',
    float: 'right',
    position: 'fixed',
    right: 0,
    textAlign: 'right',
    top: 0,
    zIndex: 20,
    ':hover': {
      animationDuration: '1s, 0.5s',
      animationIterationCount: 3,
      animationName: [fadeIn, bounce]
    }
  },
  menuItemHidden: {
    display: 'none'
  },
  notifications: {
    border: '1px dashed #e0354b',
    padding: '10px',
    position: 'relative',
    '@media (max-width: 900px)': {
      border: 'none',
      bottom: 0,
      boxSizing: 'border-box',
      fontSize: '20px',
      left: 0,
      padding: 0,
      position: 'fixed',
      right: 0,
      top: 0,
      zIndex: 10
    }
  },
  list: {
    '@media (max-width: 900px)': {
      margin: 0,
      padding: 0
    }
  }
});

class Notifications extends React.PureComponent {
  render() {
    const {
      displayDrawer,
      handleDisplayDrawer,
      handleHideDrawer,
      listNotifications,
      markNotificationAsRead
    } = this.props;

    return (
      <React.Fragment>
        <div
          className={css(styles.menuItem, displayDrawer && styles.menuItemHidden)}
          data-testid="notifications-menu"
          onClick={handleDisplayDrawer}
        >
          Your notifications
        </div>
        {displayDrawer && (
          <div className={css(styles.notifications)} data-testid="notifications-panel">
            <button
              style={{
                color: '#3a3a3a',
                fontWeight: 'bold',
                background: 'none',
                border: 'none',
                fontSize: '15px',
                position: 'absolute',
                right: '2px',
                top: '2px',
                cursor: 'pointer',
              }}
              aria-label="Close"
              onClick={handleHideDrawer}
            >
              <img src={closeIcon} alt="close-icon" width="10px" />
            </button>

            {listNotifications.length === 0 ? (
              <p>No new notification for now</p>
            ) : (
              <React.Fragment>
                <p>Here is the list of notifications</p>
                <ul className={css(styles.list)}>
                  {listNotifications.map(notification => (
                    <NotificationItem
                      key={notification.id}
                      id={notification.id}
                      type={notification.type}
                      value={notification.value}
                      html={notification.html}
                      markAsRead={markNotificationAsRead}
                    />
                  ))}
                </ul>
              </React.Fragment>
            )}
          </div>
        )}
      </React.Fragment>
    );
  }
}

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
  listNotifications: PropTypes.arrayOf(NotificationItemShape),
  markNotificationAsRead: PropTypes.func
};

Notifications.defaultProps = {
  displayDrawer: false,
  handleDisplayDrawer: () => {},
  handleHideDrawer: () => {},
  listNotifications: [],
  markNotificationAsRead: () => {}
};

export default Notifications;
