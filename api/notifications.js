import { web ,api } from './instance'

export default {
    userGetNotifications : async function(){
        let res = await api.get('/get-notifications-for-user');
        return res;
    },
    adminGetNotifications : async function(){
        let res = await api.get('/get-notifications-for-branches');
        return res;
    },
    seenNotificationsForBranches : async function(ids){
        let res = await api.post('/notifications-seen-for-branches',ids);
        return res;
    },
    seenNotificationsForUser : async function(ids){
        let res = await api.post('notifications-seen-for-user');
        return res;
    },


}