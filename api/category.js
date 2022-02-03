import { web ,api } from './instance'

export default {
    store: async function(data){
        let res = await api.post('/category',data);
        return res;
    },
    index: async function(data){
        let res = await api.get('/category');
        return res;
    },
    show: async function(id){
        let res = await api.get(`/category/${id}`);
        return res;
    },
    deleteCategory: async function(id){
        let res = await api.delete(`/category/${id}`);
        return res;
    },
    edit : async function(id,data){
        let res = await api.post(`/category/${id}`,data);
        return res;
    },
}