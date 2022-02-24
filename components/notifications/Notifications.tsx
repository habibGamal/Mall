import { useEffect, useMemo, useState } from "react";
import active from "../../helpers/active";
import t from "../../helpers/translate";
import Notification from "./Notification";
import notifi from '../../api/notifications';
import BackendBranchNotifications from "../../BackendTypes/BackendBranchNotifications";
import BranchNotifications from "../../models/BranchNotifications";
import { connect } from "react-redux";
import BlockNotifications from "../../models/BlockNotifications";
import UserNotifications from "../../models/UserNotifications";
import BackendUserNotifications from "../../BackendTypes/BackendUserNotifications";
import Empty from "../general/Empty";

function Notifications({ show, onClick, authenticated }) {
    const [blockNotifications, setNotifications] = useState([] as Array<BlockNotifications>);
    const [ids, setIds] = useState([] as Array<number>);
    const { admin, user } = authenticated;
    useEffect(() => {
        if (admin) {
            const getAdminNotifications = async () => {
                const res = await notifi.adminGetNotifications()
                const branches_notifi: Array<BackendBranchNotifications> = res.data
                setNotifications(branches_notifi.map(branch_notifi => new BranchNotifications(branch_notifi)));
            }
            getAdminNotifications();
        }
        if (user) {
            const getUserNotifications = async () => {
                const res = await notifi.userGetNotifications();
                const blocks_notifi: Array<BackendUserNotifications> = res.data
                setNotifications(blocks_notifi.map(block_notifi => new UserNotifications(block_notifi)));
            }
            getUserNotifications();
        }
    }, []);
    useEffect(() => {
        let ids = [];
        blockNotifications.map(
            block => {
                return block.notifications.map(
                    notification => {
                        if (!notification.seen) {
                            ids.push(notification.id);
                        }
                    }
                )
            }
        );
        setIds(ids);
    }, [blockNotifications]);
    function seen() {
        onClick();
        if (admin) {
            notifi.seenNotificationsForBranches({ ids });
        }
        if (user) {
            notifi.seenNotificationsForUser();
        }
        setIds([]);
    }
    return (
        <div className="circle" onClick={seen}>
            <i className="fas fa-comments"></i>
            {ids.length == 0 ? '' : <span className="count">{ids.length}</span>}
            <div className={active(show, { defaultClass: 'notifications' })} onClick={seen}>
                <h4 className='py-2'>{t('Notifications', 'تنبيهات')}</h4>
                {
                    blockNotifications.length === 0
                        ? <Empty msg={t('No Notifications', 'لا توجد تنبيهات')} />
                        : blockNotifications.map(
                            block => {
                                return block.notifications.map(
                                    notification => <Notification onClick={onClick} key={notification.id} block={block} notification={notification} />
                                )
                            }
                        )
                }

            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    authenticated: state.main.authenticated,
})
export default connect(mapStateToProps)(Notifications)