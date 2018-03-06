export function convert_case(str) {
    let lower = str.toLowerCase();
    return lower.replace(/(^| )(\w)/g, x => {
        return x.toUpperCase();
    });
}
