import BackendNotification from "./BackendNotification";

type BackendBranchNotifications = {
    id: number,
    logo: string,
    short_name: string,
    notifications: Array<BackendNotification>
}
export default BackendBranchNotifications;