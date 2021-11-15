import { api } from './instance'

export default {
    store: async function(data){
        let res = await api.post('/branch',data);
        return res;
    },
}