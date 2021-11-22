// Reducer Name
const reducerName = 'CustomerEnv';

// controller(it is control what function will be executed) => reducer
const reducer = (state = {}, action) => {
    const manageState = new State(state);
    if (action.to === reducerName) {
        if (manageState[action.type]) {
            return manageState[action.type](...action.payload);
        }
    }
    return state;
    
}

// state management
class State {
    constructor(state) {
        this.state = state;
    }
    // => cart items
    getCartItems(items){
        return {...this.state,cart:items};
    }
    addCartItem(item){
        return {...this.state,cart:[item,...this.state.cart]};
    }
    removeCartItem(id){
        const items = this.state.cart;
        const newItems = items.filter(item => item.id !== id);
        return {...this.state,cart:newItems};
    }
    uninitializing(){
        return {cart:[]};
    }
}

export default reducer;


