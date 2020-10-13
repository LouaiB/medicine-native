import PushNotification from 'react-native-push-notification';

export const NotifsService = {

    scheduleNotif: async (title, message, hour, minute, days) => {
        PushNotification.localNotification({
            title,
            message,
            userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
            playSound: true, // (optional) default: true
            soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
            // date: new Date(Date.now() + 10000),
            // repeatType: "minute",
        });
    },

    cancelAllScheduledNotifs: () => {
        // Notifications.cancelAllScheduledNotificationsAsync();
    }

}