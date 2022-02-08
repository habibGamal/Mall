import axios from "axios";
import store from "../redux/store";
import { Router } from "../redux/getStateDirect";
import { Messages } from "../redux/dispatcher";
import { MESSAGES } from "../messages/messages";
export const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}api/`,
    headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json', 'Accept': 'application/json' },
    withCredentials: true
});
export const web = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    withCredentials: true
});

export const self = axios.create({
    baseURL: `/api/`,
})

function interceptor(error) {
    const dict = {
        'userAlreadyAuthenticated':'You are already logged in!',
        'loginFirst':MESSAGES.loginFirst,
        'adminNotComplete':MESSAGES.adminNotComplete,
    }
    let res = error.response
    if (res) {
        // => redirection
        const location = res.data.location ? res.data.location:'/';
        const message = res.data.message ? res.data.message : `Error ${res.status}`;
        if (res.status === 302) {
            Messages.set('danger',dict[message]);
            Router().push(location);
            return res;
        }
        // => unauthinticated
        if (res.status === 401) {
            Messages.set('danger', message);
            return res;
        }
        // => too many requests
        if (res.status === 429) {
            Messages.set('warning', <>You are performing<strong>too many requsets</strong>. Please wait a second or use <strong>Bulk action</strong></>)
            return res;
        }
        // => if there is backend message and it isn't handled above ^
        if(res.data.error_message){
            Messages.set(res.data.type,res.data.error_message);
            return Promise.reject(error);
        }
    }
    return Promise.reject(error);
}

web.interceptors.response.use(function (response) {
    return response;
}, interceptor);

api.interceptors.response.use(function (response) {
    return response;
}, interceptor);

