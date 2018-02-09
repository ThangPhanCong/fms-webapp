export default function truncateString(str, num) {
    let st = '';
    if (num >= str.length) {

        return str;

    }
    else if (num < str.length && num > 3) {
        st = str.slice(0, num - 3);
        return st + '...';
    }

    else if (num <= 3) {
        st = str.slice(0, num);
        return st + "...";
    }


}