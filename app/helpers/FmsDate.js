export default class FmsDate {
    constructor(_date) {
        let current = new Date();
        let date;
        if (!_date) date = current;
        else date = new Date(_date);

        let cday = current.getDate();
        if (cday < 10) cday = "0" + cday;
        let cmonth = current.getMonth() + 1;
        if (cmonth < 10) cmonth = "0" + cmonth;
        let cyear = current.getFullYear();

        let day = date.getDate();
        if (day < 10) day = "0" + day;
        let month = date.getMonth() + 1;
        if (month < 10) month = "0" + month;
        let year = date.getFullYear();
        let hour = date.getHours();
        if (hour < 10) hour = "0" + hour;
        let minute = date.getMinutes();
        if (minute < 10) minute = "0" + minute;

        let whatday;
        if (cyear === year && cmonth === month && cday === day) whatday = "Hôm nay";
        else if (cyear === year && cmonth === month && cday - day === 1) whatday = "Hôm qua";
        else whatday = "Ngày " + day + " tháng " + month;

        let dayInWeek;
        switch (date.getDay()) {
            case 0:
                dayInWeek = "CNhật";
                break;
            case 1:
                dayInWeek = "Thứ 2";
                break;
            case 2:
                dayInWeek = "Thứ 3";
                break;
            case 3:
                dayInWeek = "Thứ 4";
                break;
            case 4:
                dayInWeek = "Thứ 5";
                break;
            case 5:
                dayInWeek = "Thứ 6";
                break;
            case 6:
                dayInWeek = "Thứ 7";
                break;
        }
        this.date = day;
        this.month = month;
        this.year = year;
        this.whatday = whatday;
        this.day = dayInWeek;
        this.hour = hour;
        this.minute = minute;
        this.different = cday - day;
        this.getTimeChatArea = this.getTimeChatArea.bind(this);
    }

    getTimeChatArea() {
        return this.whatday;
    }

    getTimeConversationItem() {
        if (this.different === 0) return this.hour + ":" + this.minute;
        else if (this.different < 7 && this.different > 0) return this.day;
        else return this.date + "/" + this.month;
    }

    getTimeMessageItem() {
        return this.hour + ":" + this.minute;
    }

    getTimeInfoChat() {
        let res = "Đã xem gần nhất";
        let whatday = this.whatday;
        if (this.whatday !== " hôm nay" && this.whatday !== " hôm qua") {
            whatday = " ngày " + this.date + "/" + this.month;
        }
        let moment = " lúc " + this.hour + ":" + this.minute;
        return res + moment + whatday;
    }

    getTimePostItem() {
        let res = "Đăng";
        let whatday = this.whatday;
        if (this.whatday !== " hôm nay" && this.whatday !== " hôm qua") {
            whatday = " ngày " + this.date + "/" + this.month;
        }
        let moment = " lúc " + this.hour + ":" + this.minute;
        return res + moment + whatday;
    }
}