import BackendNotification from "./BackendNotification";

type BackendUserNotifications = {
    id: number,
    name: string,
    avatar: string,
    notifications: Array<BackendNotification>,
}
export default BackendUserNotifications;