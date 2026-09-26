import React from 'react';
import PropTypes from 'prop-types';

function NotificationItem({ id, type, html, value, markAsRead }) {
  if (html) {
    return (
      <li
        data-notification-type={type}
        dangerouslySetInnerHTML={html}
        onClick={() => markAsRead(id)}
      />
    );
  }

  return (
    <li data-notification-type={type} onClick={() => markAsRead(id)}>
      {value}
    </li>
  );
}

NotificationItem.propTypes = {
  html: PropTypes.shape({
    __html: PropTypes.string
  }),
  id: PropTypes.number,
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

export default NotificationItem;
