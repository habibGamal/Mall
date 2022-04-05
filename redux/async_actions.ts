import auth from "../api/auth";
import cart from "../api/cart";
import category from "../api/category";
import { Messages } from "./dispatcher";
import { State as ApiDataState } from './controllers/api_data';
import { State as CustomerEnvState } from './controllers/customer_env';
import store from "./store";

class AsyncActions {
    static instance = new AsyncActions();
    GetCategories() {
        return async (dispatch) => {
            let res = await category.index();
            if (res.status === 200) {
                dispatch({
                    to: ApiDataState.to,
                    type: 'getCategories',
                    payload: [res.data]
                });
            }
        }
    }
    async InitializeCustomerEnv(dispatch) {
        // => get its cart
        let res = await cart.index();
        dispatch({
            to: CustomerEnvState.to,
            type: 'getCartItems',
            payload: [res.data]
        });
    }
    UnInitializeCustomerEnv(dispatch) {
        dispatch({
            to: CustomerEnvState.to,
            type: 'uninitializing',
            payload: []
        });
    }
    AddCartItem(data) {
        return async (dispatch) => {
            try {
                let res = await cart.addProduct(data);
                if (res.status === 200) {
                    dispatch({
                        to: CustomerEnvState.to,
                        type: 'addCartItem',
                        payload: [res.data]
                    })
                    Messages.set('success', 'Item is added to cart');
                }
            } catch (error) {
                let { status } = error?.response;
                if (status === 403) {
                    Messages.set('warning', 'Item has already added to cart');
                }
                throw error;
            }
        }
    }
    UpdateCartItem(id, count) {

        return async (dispatch) => {
            let res = await cart.increaseItemQuantity(id, { product_count: count, '_method': 'PUT' });
            if (res.status === 200) {
                let res = await cart.index();
                dispatch({
                    to: CustomerEnvState.to,
                    type: 'getCartItems',
                    payload: [res.data]
                });
            }
        }
    }
    RemoveCartItem(id) {
        return async (dispatch) => {
            let res = await cart.deleteItem(id);
            if (res.status === 200) {
                if (res.data) {
                    dispatch({
                        to: CustomerEnvState.to,
                        type: 'removeCartItem',
                        payload: [id]
                    })
                }
                Messages.set('warning', 'Item has been removed from cart');
            }
        }
    }
    Reauth() {
        return async (dispatch) => {
            let res = await auth.isAuthenticated();
            if (res.status === 200) {
                dispatch({
                    to: 'Main',
                    type: 'authenticating',
                    payload: [res.data]
                });
                if (res.data.user) {
                    this.InitializeCustomerEnv(dispatch);
                } else {
                    this.UnInitializeCustomerEnv(dispatch)
                }
            }
        }
    }
}


const asyncDispatcher = {
    get: function (target, prop) {
        return (...args) => store.dispatch(AsyncActions.instance[prop](...args));
    }
}



export let $Async: AsyncActions = new Proxy({}, asyncDispatcher);