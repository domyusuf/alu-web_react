import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Notifications from './Notifications';
import { fetchNotifications, markAsAread, setNotificationFilter } from '../actions/notificationActionCreators';
import { getUnreadNotificationsByType } from '../selectors/notificationSelector';

export class NotificationsContainer extends React.Component {
  componentDidMount() { this.props.fetchNotifications(); }
  render() { return <Notifications {...this.props} />; }
}
NotificationsContainer.propTypes = { ...Notifications.propTypes, fetchNotifications: PropTypes.func };
NotificationsContainer.defaultProps = { ...Notifications.defaultProps, fetchNotifications: () => {} };
export function mapStateToProps(state) { return { listNotifications: getUnreadNotificationsByType(state.notifications) }; }
export const mapDispatchToProps = { fetchNotifications, markNotificationAsRead: markAsAread, setNotificationFilter };
export default connect(mapStateToProps, mapDispatchToProps)(NotificationsContainer);
