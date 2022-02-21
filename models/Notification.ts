import BackendNotification from "../BackendTypes/BackendNotification";

export default class Notification {
    id:number;
    message:string;
    time:string;
    seen: boolean;
    constructor(notification:BackendNotification){
        this.id = notification.id;
        this.message = notification.message;
        this.time = notification.created_at;
        this.seen = notification.seen;
    }
}