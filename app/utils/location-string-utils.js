export function convert_case(str) {
    let lower = str.toLowerCase();
    return lower.replace(/(^| )(.+?)/g, x => {
        return x.toUpperCase();
    });
}
