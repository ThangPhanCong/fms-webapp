export function toReadablePrice(price, devider = '.') {
    const reverseWords = price.toString().split('').reverse();
    return reverseWords.map((w, i) => {
        if (i % 3 === 0 && i !== 0) {
            return w + devider;
        } else {
            return w;
        }
    }).reverse().join('');
}