import { web ,api } from './instance'

export default {
    store: async function(data){
        let res = await api.post('/product',data);
        return res;
    },
}