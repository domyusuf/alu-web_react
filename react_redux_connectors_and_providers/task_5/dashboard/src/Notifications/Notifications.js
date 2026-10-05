import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import closeIcon from '../assets/close-icon.png';
import NotificationItem from './NotificationItem';
import { connect } from 'react-redux';
import { List } from 'immutable';
import { fetchNotifications } from '../actions/notificationActionCreators';

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
    backgroundColor: 'white',
    maxHeight: '70vh',
    overflowY: 'auto',
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

export class Notifications extends React.PureComponent {
  componentDidMount() { this.props.fetchNotifications(); }
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

            {listNotifications.size === 0 ? (
              <p>No new notification for now</p>
            ) : (
              <React.Fragment>
                <p>Here is the list of notifications</p>
                <ul className={css(styles.list)}>
                  {listNotifications.map(notification => (
                    <NotificationItem
                      key={notification.get('guid')}
                      id={notification.get('guid')}
                      type={notification.get('type')}
                      value={notification.get('value')}

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
  fetchNotifications: PropTypes.func,
  displayDrawer: PropTypes.bool,
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
  listNotifications: PropTypes.instanceOf(List),
  markNotificationAsRead: PropTypes.func
};

Notifications.defaultProps = {
  displayDrawer: false,
  handleDisplayDrawer: () => {},
  handleHideDrawer: () => {},
  listNotifications: List(),
  fetchNotifications: () => {},
  markNotificationAsRead: () => {}
};

export function mapStateToProps(state) { return { listNotifications: state.notifications.get('messages').valueSeq().toList() }; }
export const mapDispatchToProps = { fetchNotifications };
export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
