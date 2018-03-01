export function toReadableDatetime(datetime) {
    const date = new Date(datetime);
    let year = date.getFullYear();
    let month = 1 + date.getMonth();
    month = month > 10 ? month : '0' + month;
    let day = date.getDate();
    day = day > 10 ? day : '0' + day;

    let hour = date.getHours();
    hour = hour > 10 ? hour : '0' + hour;
    let min = date.getMinutes();
    min = min > 10 ? min : '0' + min;
    
    return {
        time: hour + ':' + min,
        date: day + '/' + month + '/' + year
    };
}