import React from 'react';

function NotificationItem({ type, html, value }) {
  if (html) {
    return (
      <li data-notification-type={type} dangerouslySetInnerHTML={html}></li>
    );
  }
  return (
    <li data-notification-type={type}>{value}</li>
  );
}

export default NotificationItem;
