import BackendBranchNotifications from "../BackendTypes/BackendBranchNotifications";
import BlockNotifications from "./BlockNotifications";
import Notification from "./Notification";
import Picture from "./Picture";

export default class BranchNotifications extends BlockNotifications{
    constructor(branch: BackendBranchNotifications) {
        super();
        this.id = branch.id;
        this.name = branch.short_name;
        this.avatar = Picture.getPicture(branch.logo);
        this.notifications = branch.notifications.map(notication => new Notification(notication));
        this.redirect = `/dashboard?tap=orders&branch=${this.id}`;
    }
}