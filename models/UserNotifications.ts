import BackendUserNotifications from "../BackendTypes/BackendUserNotifications";
import BlockNotifications from "./BlockNotifications";
import Notification from "./Notification";
import Picture from "./Picture";

export default class UserNotifications extends BlockNotifications{
    constructor(block: BackendUserNotifications) {
        super();
        this.id = block.id;
        this.name = block.name;
        this.avatar = Picture.getPicture(block.avatar);
        this.notifications = block.notifications.map(notication => new Notification(notication));
        this.redirect = '/order/user_orders';
    }
}