import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import closeIcon from '../assets/close-icon.png';
import NotificationItem from './NotificationItem';
import NotificationItemShape from './NotificationItemShape';

const styles = StyleSheet.create({
  notifications: {
    border: '2px dashed #FF0000',
    padding: '24px',
    position: 'relative'
  },
  notificationsList: {
    listStyleType: 'disc',
    paddingLeft: '20px'
  },
  menuItem: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: '10px',
    cursor: 'pointer'
  },
  button: {
    float: 'right',
    height: '25px',
    width: '25px',
    position: 'absolute',
    top: '16px',
    right: '16px',
    background: 'none',
    border: 'none'
  },
  buttonImg: {
    height: '20px',
    width: '20px'
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
        <div className={css(styles.menuItem)} data-testid="notifications-menu">
          Your notifications
        </div>
        {displayDrawer && (
          <div className={css(styles.notifications)} data-testid="notifications-panel">
            <button
              className={css(styles.button)}
              aria-label="Close"
              onClick={() => console.log('Close button has been clicked')}
            >
              <img className={css(styles.buttonImg)} src={closeIcon} alt="close-icon" />
            </button>

            {listNotifications.length === 0 ? (
              <p>No new notification for now</p>
            ) : (
              <React.Fragment>
                <p>Here is the list of notifications</p>
                <ul className={css(styles.notificationsList)}>
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
