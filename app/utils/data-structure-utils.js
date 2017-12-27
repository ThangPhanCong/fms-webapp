export function flatStructure(treeConfig) {
    if (Array.isArray(treeConfig) && treeConfig.length > 0) {
        let flatConfig = [];

        for (let item of treeConfig) {
            if (Array.isArray(item.children) && item.children.length > 0) {
                flatConfig = flatConfig.concat(flatStructure(item.children));
            } else {
                flatConfig.push(item);
            }
        }

        return flatConfig;
    } else {
        return [];
    }
}