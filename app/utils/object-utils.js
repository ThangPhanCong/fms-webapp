export function cloneDiff(obj1, obj2) {
    const diff = {...obj1};
    const keys = Object.keys(obj1).concat(Object.keys(obj2));

    for (let key of keys) {
        if (obj1.hasOwnProperty(key) && obj1[key] === obj2[key]) {
            delete diff[key];
        } else if (obj2.hasOwnProperty(key)) {
            diff[key] = obj2[key];
        }
    }

    return diff;
}

export function cloneDeep(obj) {
    return JSON.parse(JSON.stringify(obj));
}