import { startOfTomorrow, addHours, addSeconds, format as f } from 'date-fns';
export var SERVER_UTC_OFFSET = new Date().getTimezoneOffset() * 60;
export function timeAt3am(utcOffset) {
    var offset = utcOffset + SERVER_UTC_OFFSET;
    return addSeconds(addHours(startOfTomorrow(new Date()), 3), offset);
}
export function format(date) {
    return f(date, 'MMM d, yyyy h:mm:ssaaa OOOO');
}
//# sourceMappingURL=time.js.map