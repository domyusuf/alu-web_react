import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  default: {
    color: 'blue'
  },
  urgent: {
    color: 'red'
  },
  item: {
    '@media (max-width: 900px)': {
      borderBottom: '1px solid black',
      boxSizing: 'border-box',
      fontSize: '20px',
      padding: '10px 8px',
      width: '100%'
    }
  }
});

function NotificationItem({ id, type, html, value, markAsRead }) {
  if (html) {
    return (
      <li
        className={css(type === 'urgent' ? styles.urgent : styles.default, styles.item)}
        data-notification-type={type}
        dangerouslySetInnerHTML={html}
        onClick={() => markAsRead(id)}
      />
    );
  }

  return (
    <li
      className={css(type === 'urgent' ? styles.urgent : styles.default, styles.item)}
      data-notification-type={type}
      onClick={() => markAsRead(id)}
    >
      {value}
    </li>
  );
}

NotificationItem.propTypes = {
  html: PropTypes.shape({
    __html: PropTypes.string
  }),
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  markAsRead: PropTypes.func,
  type: PropTypes.string.isRequired,
  value: PropTypes.string
};

NotificationItem.defaultProps = {
  html: undefined,
  id: 0,
  markAsRead: () => {},
  type: 'default',
  value: ''
};

export default React.memo(NotificationItem);
