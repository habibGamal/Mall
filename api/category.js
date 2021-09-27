import { web ,api } from './instance'

export default {
    store: async function(data){
        let res = await api.post('/category',data);
        return res;
    },
    index: async function(data){
        let res = await api.get('/category',data);
        return res;
    },
    deleteCategory : async function(id){
        let res = await api.delete(`/category/${id}`);
        return res;
    },
}