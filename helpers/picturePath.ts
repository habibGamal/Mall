export default function handlePath(path: string): string {
    if (path.includes('public')) {
        return process.env.NEXT_PUBLIC_BASE_URL_STORAGE + path.replace('public', '')
    }
    return path;
}