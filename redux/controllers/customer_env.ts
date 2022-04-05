import BackendCartItem from "../../BackendTypes/BackendCartItem";
import CartItem from "../../models/CartItem";

type CustomerEnvironmentStateType = {
    cart: CartItem[];
}
export const initState:CustomerEnvironmentStateType = {
    cart:[],
}
// state management
export class State {
    static to = 'CustomerEnv';
    state: CustomerEnvironmentStateType
    constructor(state: CustomerEnvironmentStateType) {
        this.state = state;
    }
    // => cart items
    getCartItems(items:Array<BackendCartItem>) {
        return { ...this.state, cart: items };
    }
    addCartItem(item:BackendCartItem) {
        return { ...this.state, cart: [item, ...this.state.cart] };
    }
    removeCartItem(id:number) {
        const items = this.state.cart;
        const newItems = items.filter(item => item.id !== id);
        return { ...this.state, cart: newItems };
    }
    uninitializing() {
        return { cart: [] };
    }
}


