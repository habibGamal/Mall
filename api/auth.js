import { web ,api, self } from './instance'
export default {
    // register
    register: async function(data){
        let res = await api.post('/register',data);
        return res;
    },
    // login
    login: async function(data){
        let res = await api.post('/login',data);
        if(res.status === 200){
            await self.post('/setKey',{key:res.data});
            api.defaults.headers.common['Authorization'] = `Bearer ${res.data}`;
        }
        return res;
    },
    adminLogin: async function(data){
        let res = await api.post('/admin-login',data);
        if(res.status === 200){
            await self.post('/setKey',{key:res.data});
            api.defaults.headers.common['Authorization'] = `Bearer ${res.data}`;
        }
        return res;
    },
    // logout
    logout: async function(){
        let res = await api.post('/logout');
        return res;
    },
    adminLogout: async function(){
        let res = await api.post('/admin-logout');
        return res;
    },
    // check authenication
    isAuthenticated: async function(){
        if(api.defaults.headers.common['Authorization'] === undefined){
            let key = await this.getCookie();
            key? api.defaults.headers.common['Authorization'] = `Bearer ${key}`:'';
        }
        let res = await api.get('/state');
        return res;
    },
    // get the cookie
    getCookie: async function(){
        let res = await self.get('/getKey');
        if(res.status === 200){
            if(res.data.key !== undefined){
                return res.data.key;
            }
        }
        return false;
    },
    clearAllTokens: async function(){
        let res = await api.post('/clear-tokens');
        return res;
    },
}