export function toReadablePrice(price, devider = '.') {
    const _price = price || 0;
    const reverseWords = _price.toString().split('').reverse();
    return reverseWords.map((w, i) => {
        if (i % 3 === 0 && i !== 0) {
            return w + devider;
        } else {
            return w;
        }
    }).reverse().join('');
}