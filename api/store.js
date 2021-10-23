import { api } from './instance'

export default {
    store: async function(data){
        let res = await api.post('/store',data);
        return res;
    },
}