import store from "../store";

// Reducer Name
const reducerName = 'Messages';

// controller(it is control what function will be executed) => reducer
const reducer = (state = [], action) => {
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
    set(type, content) {
        return [...this.state, { index: new Date().getTime(), type, content }]
    }
    clear(index) {
        let newState = this.state.filter((m) => m.index !== index);
        return newState;
    }
}

// ex: Messages.set(...)

export default reducer;