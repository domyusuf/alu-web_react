import { createSelector } from 'reselect';
import { NotificationTypeFilters } from '../actions/notificationActionTypes';

export function filterTypeSelected(state) { return state.get('filter'); }
export function getNotifications(state) { return state.get('messages'); }
export const getUnreadNotificationsByType = createSelector(
  [filterTypeSelected, getNotifications],
  (filter, messages) => messages.valueSeq()
    .filter(message => !message.get('isRead') && (filter !== NotificationTypeFilters.URGENT || message.get('type') === 'urgent'))
    .toList()
);
