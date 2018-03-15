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

// datetime (dd/MM/yyyy hh:mm:00) to (yyyy-MM-ddThh:mm)
export function toDatetimeLocal(datetime) {
    if (datetime) {
        datetime = datetime.split(' ');
        const date = datetime[0].split('/');
        const time = datetime[1].split(':');

        return `${date[2]}-${date[1]}-${date[0]}T${time[0]}:${time[1]}`;
    }
    return '';
}