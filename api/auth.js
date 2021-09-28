import { web ,api } from './instance'
export default {
    login: async function(data){
        await web.get('/sanctum/csrf-cookie');
        let res = await web.post('/login',data);
        return res;
    },
    logout: async function(){
        await web.get('/sanctum/csrf-cookie');
        let res = await web.post('/logout');
        return res;
    },
    isAuthenticated: async function(){
        let res = await api.get('/state');
        return res;
    },
    getCookie: async function(){
        let res = await api.get('/getCookie');
        return res;
    },
}