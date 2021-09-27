import axios from "axios";
import store from "../redux/store";
import { Router } from "../redux/getStateDirect";
export const api = axios.create({
    baseURL: 'http://mallonlineback.co:8000/api/',
    headers: { 'Access-Control-Allow-Origin': '*','Content-Type': 'application/json', 'Accept': 'application/json' },
    withCredentials: true
});
export const web = axios.create({
    baseURL: 'http://mallonlineback.co:8000/',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    withCredentials: true
});

function interceptor(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    let res = error.response
    if (res.status === 302) {
        let location = res.data.location === undefined ? '/' : res.data.location
        Router().push(location);
        return res;
    }
    return Promise.reject(error);
}

web.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, interceptor);
