import axios from "axios";
import store from "../redux/store";
import { Router } from "../redux/getStateDirect";
import { SetMessage } from "../redux/dispatchDirect";
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

function interceptor(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    let res = error.response
    // => redirection
    if (res.status === 302) {
        let location = res.data.location === undefined ? '/' : res.data.location
        Router().push(location);
        return res;
    }
    // => too many requests
    if (res.status === 429) {
        SetMessage('warning', <>You are performing<strong>too many requsets</strong>. Please wait a second or use <strong>Bulk action</strong></>)
        return res;
    }
    return Promise.reject(error);
}

web.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, interceptor);

api.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, interceptor);

