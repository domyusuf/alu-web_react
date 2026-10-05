export function filterTypeSelected(state) { return state.get('filter'); }
export function getNotifications(state) { return state.get('messages'); }
export function getUnreadNotifications(state) { return getNotifications(state).filter(message => !message.get('isRead')); }
