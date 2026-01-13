import notifee, {
  TriggerType,
  AndroidImportance,
  RepeatFrequency,
} from '@notifee/react-native';

import {
  getReminderIdFromTime,
  getNextWeekdayTimestamp,
  Weekday,
} from '../utils/timeUtils';

async function getDefaultChannelId(): Promise<string> {
  return await notifee.createChannel({
    id: 'default',
    name: 'Default',
    importance: AndroidImportance.HIGH,
  });
}

export async function isReminderScheduled(id: string): Promise<boolean> {
  const triggers = await notifee.getTriggerNotifications();
  return triggers.some(item => item.notification.id === id);
}

/**
 * Schedule reminder using ONLY time
 */
// export async function scheduleReminder(
//   time: string,
//   title = 'Reminder ⏰',
//   body?: string
// ) {
//   const id = getReminderIdFromTime(time);

//   const alreadyScheduled = await isReminderScheduled(id);
//   if (alreadyScheduled) {
//     console.log(`Reminder already scheduled for ${time}`);
//     return;
//   }

//   const channelId = await getDefaultChannelId();

//   await notifee.createTriggerNotification(
//     {
//       id,
//       title,
//       body: body ?? `It is ${time} not dublicate`,
//       android: {
//         channelId,
//         smallIcon: 'ic_launcher',
//         pressAction: { id: 'default' },
//       },
//     },
//     {
//       type: TriggerType.TIMESTAMP,
//       timestamp: getTodayTimestamp(time),
//     }
//   );
// }

export async function scheduleWeeklyReminder(
  weekday: Weekday,
  time: string,
  title = 'Reminder',
  body?: string
) {
  const id = getReminderIdFromTime(weekday, time);

  if (await isReminderScheduled(id)) {
    console.log(`Already scheduled: ${id}`);
    return;
  }

  const channelId = await getDefaultChannelId();

  await notifee.createTriggerNotification(
    {
      id,
      title,
      body: body ?? `${weekday} at ${time}`,
      android: {
        channelId,
        importance: AndroidImportance.HIGH,
        smallIcon: 'ic_launcher',
        pressAction: { id: 'default' },
      },
      ios: {
        sound: 'default',
        },
    },
    {
      type: TriggerType.TIMESTAMP,
      timestamp: getNextWeekdayTimestamp(time, weekday),
      repeatFrequency: RepeatFrequency.WEEKLY,
    }
  );
}
