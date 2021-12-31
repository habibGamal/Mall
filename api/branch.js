import { api } from './instance'

export default {
    store: async function(data){
        let res = await api.post('/branch',data);
        return res;
    },
    show: async function(id){
        let res = await api.get(`/branch/${id}`);
        return res;
    },
    index: async function(){
        let res = await api.get(`/branch`);
        return res;
    },
}