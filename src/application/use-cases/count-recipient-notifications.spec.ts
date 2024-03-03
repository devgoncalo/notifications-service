import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count recipient notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      new Notification({
        recipientId: 'recipient-1',
        category: 'social',
        content: new Content('You received a new friend request!'),
      }),
    );

    await notificationsRepository.create(
      new Notification({
        recipientId: 'recipient-1',
        category: 'social',
        content: new Content('You received a new friend request!'),
      }),
    );

    await notificationsRepository.create(
      new Notification({
        recipientId: 'recipient-2',
        category: 'social',
        content: new Content('You received a new friend request!'),
      }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toEqual(2);
  });
});
