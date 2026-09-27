import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import closeIcon from '../assets/close-icon.png';
import NotificationItem from './NotificationItem';
import NotificationItemShape from './NotificationItemShape';

const styles = StyleSheet.create({
  menuItem: {
    textAlign: 'right'
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

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.markAsRead = this.markAsRead.bind(this);
  }

  markAsRead(id) {
    console.log(`Notification ${id} has been marked as read`);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.listNotifications.length > this.props.listNotifications.length;
  }

  render() {
    const { displayDrawer, listNotifications } = this.props;

    return (
      <React.Fragment>
        <div className={`menuItem ${css(styles.menuItem)}`}>Your notifications</div>
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
              onClick={() => console.log('Close button has been clicked')}
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
                      markAsRead={this.markAsRead}
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
  listNotifications: PropTypes.arrayOf(NotificationItemShape)
};

Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: []
};

export default Notifications;
