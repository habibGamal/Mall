import Image from "next/image";
import { useRouter } from "next/router";
import loader from "../../loader";
import BranchNotifications from "../../models/BranchNotifications";
import NotificationModel from "../../models/Notification";

export default function Notification({ block, notification, onClick }: { block: BranchNotifications, notification: NotificationModel ,onClick:Function}) {
    const router = useRouter();
    function action(){
        router.push(block.redirect);
        onClick();
    }
    return (
        <div className="row notification" onClick={action}>
            <div className="image">
                <Image loader={loader} src={block.avatar.path} width={100} height={100} objectFit="cover" />
            </div>
            <div className="content">
                <h4>{block.name}</h4>
                <p className="info">{notification.message}</p>
            </div>
            <div className="time">
                <span>{notification.time}</span>
            </div>
        </div>
    )
}