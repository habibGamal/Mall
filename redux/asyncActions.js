import auth from "../api/auth";
import cart from "../api/cart";
import category from "../api/category";
import { Messages } from "./dispatcher";
import store from "./store";

class AsyncActions {
    static GetCategories() {
        return async (dispatch) => {
            let res = await category.index();
            if (res.status === 200) {
                dispatch({
                    to: 'ApiData',
                    type: 'getCategories',
                    payload: [res.data]
                });
            }
        }
    }
    static async InitializeCustomerEnv(dispatch) {
        // => get its cart
        let res = await cart.index();
        dispatch({
            to: 'CustomerEnv',
            type: 'getCartItems',
            payload: [res.data]
        });
    }
    static UnInitializeCustomerEnv(dispatch) {
        dispatch({
            to: 'CustomerEnv',
            type: 'uninitializing',
            payload: []
        });
    }
    static AddCartItem(data) {
        return async (dispatch) => {
            try{
                let res = await cart.addProduct(data);
                if (res.status === 200) {
                    dispatch({
                        to: 'CustomerEnv',
                        type: 'addCartItem',
                        payload: [res.data]
                    })
                    Messages.set('success','Item is added to cart');
                }
            }catch(error){
                let {status} = error?.response;
                if(status === 403){
                    Messages.set('warning','Item has already added to cart');
                }
            }
        }
    }
    static UpdateCartItem(id, count) {

        return async (dispatch) => {
            let res = await cart.increaseItemQuantity(id, { product_count: count, '_method': 'PUT' });
            if (res.status === 200) {
                let res = await cart.index();
                dispatch({
                    to: 'CustomerEnv',
                    type: 'getCartItems',
                    payload: [res.data]
                });
            }
        }
    }
    static RemoveCartItem(id) {
        return async (dispatch) => {
            let res = await cart.deleteItem(id);
            if (res.status === 200) {
                if (res.data) {
                    dispatch({
                        to: 'CustomerEnv',
                        type: 'removeCartItem',
                        payload: [id]
                    })
                }
                Messages.set('warning','Item has been removed from cart');
            }
        }
    }
    static Reauth() {
        return async (dispatch) => {
            let res = await auth.isAuthenticated();
            if (res.status === 200) {
                dispatch({
                    to: 'Main',
                    type: 'authenticating',
                    payload: [res.data]
                });
                if (res.data.user) {
                    AsyncActions.InitializeCustomerEnv(dispatch);
                } else {
                    AsyncActions.UnInitializeCustomerEnv(dispatch)
                }
            }
        }
    }
}


const asyncDispatcher = {
    get: function (target, prop) {
        return (...args) => store.dispatch(AsyncActions[prop](...args));
    }
}



export let $Async = new Proxy({}, asyncDispatcher);