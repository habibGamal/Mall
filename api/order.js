import { web ,api } from './instance'

export default {
    // user
    make : async function(){
        let res = await api.post('/create-order');
        return res;
    },
    getOrdersForUser : async function(){
        let res = await api.get(`/get-orders-for-user`);
        return res;
    },
    removeProductFromOrder : async function(item_id,order_id){
        let res = await api.get(`remove-product-from-order/${item_id}/${order_id}`);
        return res;
    },
    cancelOrder : async function(order_id){
        let res = await api.get(`cancel-order/${order_id}`);
        return res;
    },
    refuseOrderAfterConflict : async function(order_id){
        let res = await api.get(`refuse-order-after-conflict/${order_id}`);
        return res;
    },
    proccedAfterConflict : async function(order_id){
        let res = await api.get(`procced-order-after-conflict/${order_id}`);
        return res;
    },

    // admin
    getOrdersForBranch : async function(id){
        let res = await api.get(`/get-orders-for-branch/${id}`);
        return res;
    },
    acceptOrder : async function(branch_id,order_id){
        let res = await api.get(`admin-accept-order/${branch_id}/${order_id}`);
        return res;
    },
    rejectOrder : async function(branch_id,order_id){
        let res = await api.get(`admin-reject-order/${branch_id}/${order_id}`);
        return res;
    },
    rejectProductFromOrder : async function(item_id,order_id,branch_id){
        let res = await api.get(`reject-product-from-order/${item_id}/${order_id}/${branch_id}`);
        return res;
    },

}