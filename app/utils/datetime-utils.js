export function toReadableDatetime(datetime) {
    const date = new Date(datetime);
    let year = date.getFullYear().toString();
    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    let day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    let hour = date.getHours().toString();
    hour = hour.length > 1 ? hour : '0' + hour;
    let min = date.getMinutes().toString();
    min = min.length > 1 ? min : '0' + min;
    
    return {
        time: hour + ':' + min,
        date: day + '/' + month + '/' + year
    };
}