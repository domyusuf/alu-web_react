
import { normalize, schema } from 'normalizr';
import notifications from '../../notifications.json';

const user = new schema.Entity('users');
const message = new schema.Entity('messages', {}, { idAttribute: 'guid' });
const notification = new schema.Entity('notifications', {
  author: user,
  context: message,
});

export const normalizedData = normalize(notifications, [notification]);

export function getAllNotificationsByUser(userId) {
  return normalizedData.result.reduce((contexts, notificationId) => {
    const item = normalizedData.entities.notifications[notificationId];

    if (item.author === userId) {
      contexts.push(normalizedData.entities.messages[item.context]);
    }

    return contexts;
  }, []);
}
