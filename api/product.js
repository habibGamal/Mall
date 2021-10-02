import { web ,api } from './instance'

export default {
    store: async function(data){
        let res = await api.post('/product',data);
        return res;
    },
    index: async function(){
        let res = await api.get('/product');
        return res;
    },
    show: async function(id){
        let res = await api.get(`/product/${id}`);
        return res;
    }
}