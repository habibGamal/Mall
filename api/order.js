import { web ,api } from './instance'

export default {
    make : async function(){
        let res = await api.post('/create-order');
        return res;
    },
    getOrdersForBranch : async function(id){
        let res = await api.get(`/get-orders-for-branch/${id}`);
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
    acceptOrder : async function(branch_id,order_id){
        let res = await api.get(`admin-accept-order/${branch_id}/${order_id}`);
        return res;
    },

}