export function countNotificationArchived(notifications) {
    let sum = 0;

    notifications.map((noti, i) => {
        if (noti.is_archived) {
            sum += 1;
        }

    });

    return sum;
};

export function countNotificationSeen(notifications) {
    let sum = 0;

    notifications.map((noti, i) => {
        if (!noti.is_seen) {
            sum += 1;
        }

    });

    if (sum == 0) {
        sum = ''
    }

    return sum;
}