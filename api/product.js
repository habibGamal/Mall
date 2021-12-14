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
    },
    deleteList: async function(ids){
        let res = await api.post('/product/deleteList',ids);
        return res;
    },
    getRowPicture : async function (paths){
        const res = await api.post('/getRowPicture',{paths});
        return res;
    }
}