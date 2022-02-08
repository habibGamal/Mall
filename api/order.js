import { web ,api } from './instance'

export default {
    make : async function(){
        let res = await api.post('/order');
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
    removeProductFromOrder : async function(product_id,order_id){
        let res = await api.get(`remove-product-from-order/${product_id}/${order_id}`);
        return res;
    },
    cancelOrder : async function(order_id){
        let res = await api.get(`cancel-order/${order_id}`);
        return res;
    },

}