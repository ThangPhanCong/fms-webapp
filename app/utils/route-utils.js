export function getRouteNameAtLevel(route, level) {
    const routeNames = route.split('/').filter(r => r !== '');
    return routeNames[level - 1];
}