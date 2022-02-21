import BackendBranchNotifications from "../BackendTypes/BackendBranchNotifications";
import Notification from "./Notification";
import Picture from "./Picture";

export default class BlockNotifications {
    id: number;
    avatar: Picture;
    name: string;
    redirect: string;
    notifications:Array<Notification>
}