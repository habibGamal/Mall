// Reducer Name
const reducerName = 'Router';

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
    set(router) {
        return router;
    }
}

export default reducer;


