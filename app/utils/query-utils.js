export function toQueryParams(object) {
    return Object.keys(object)
        .reduce((query, key, i) => {
            const queryParam = `${key}=${object[key]}`;
            return i === 0 ? queryParam : `${query}&${queryParam}`;
        }, '');
}