export function getRouteNameAtLevel(route, level) {
    const routeNames = route.split('/').filter(r => r !== '');
    console.log('routeNames', routeNames)
    return routeNames[level - 1];
}