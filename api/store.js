import { api } from './instance'

export default {
    store: async function(data){
        let res = await api.post('/store',data);
        if(res.status === 302){
            Messages.set('danger',MESSAGES.userAlreadyLogin);
        }
        return res;
    },
}