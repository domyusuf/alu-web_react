import { normalize, schema } from 'normalizr';
import notifications from '../../notifications.json';

export const user = new schema.Entity('users');
export const message = new schema.Entity('messages', {}, { idAttribute: 'guid' });
export const notification = new schema.Entity('notifications', {
  author: user,
  context: message,
});

export function notificationsNormalizer(data) {
  return normalize(data, [notification]);
}

export const normalizedData = notificationsNormalizer(notifications);

export function getAllNotificationsByUser(userId) {
  return normalizedData.result.reduce((contexts, notificationId) => {
    const item = normalizedData.entities.notifications[notificationId];

    if (item.author === userId) {
      contexts.push(normalizedData.entities.messages[item.context]);
    }

    return contexts;
  }, []);
}
