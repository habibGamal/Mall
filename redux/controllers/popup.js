// Reducer Name
const reducerName = 'Popup';

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
    init(key){
        return { ...this.state, [key]: false };
    }
    setPopup(key,value,args) {
        return { ...this.state, [key]: value , args};
    }
    uninstallPopup(key){
        delete this.state[key];
        return {...this.state};
    }
}

export default reducer;


