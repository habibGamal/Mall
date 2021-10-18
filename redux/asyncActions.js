import auth from "../api/auth";
import category from "../api/category";
import store from "./store";

class AsyncActions {
    static GetCategories() {
        return async (dispatch) => {
            let res = await category.index();
            if (res.status === 200) {
                dispatch({
                    to:'ApiData',
                    type:'getCategories',
                    payload: [res.data]
                });
            }
        }
    }
    static Reauth() {
        return async (dispatch) => {
            let res = await auth.isAuthenticated();
            if (res.status === 200) {
                dispatch({
                    to:'Main',
                    type:'authenticating',
                    payload: [res.data]
                });
            }
        }
    }
}


const asyncDispatcher = {
    get: function (target, prop) {
        return ()=>store.dispatch(AsyncActions[prop]());
    }
}



export let $Async = new Proxy({}, asyncDispatcher);