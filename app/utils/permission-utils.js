export function parse_permissions(permissions_array) {
    let permissions = {};
    if (permissions_array) { 
        permissions_array.map((item) => {
            let perm = item.split('_')[0];
            if (!permissions.hasOwnProperty(perm)) {
                permissions[perm] = [];
            }
            permissions[perm].push(item);
        });
    }
    return permissions;
}
