export function isActivePath(path: string, currentPath: string) {
    if (path === '/') {
        return currentPath === '/';
    }
    return currentPath.startsWith(path);
}
