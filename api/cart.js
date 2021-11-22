import { web ,api } from './instance'

export default {
    index : async function(){
        let res = await api.get('/cart-item');
        return res;
    },
    addProduct : async function(data){
        let res = await api.post('/cart-item',data);
        return res;
    },
    increaseItemQuantity : async function(id,data){
        let res = await api.post(`/cart-item/${id}`,data);
        return res;
    },
    deleteItem : async function(id){
        let res = await api.delete(`/cart-item/${id}`);
        return res;
    },
}