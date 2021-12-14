// Reducer Name
const reducerName = 'Forms';

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
    attachForm(formKey){
        if(!this.state[formKey]){
            return {...this.state,[formKey]:{}};
        }
        return this.state;
    }
    unattachForm(formKey){
        delete this.state[formKey];
        return {...this.state};
    }
    emptyForm(formKey){
        return {...this.state,[formKey]:{}};
    }
    setInputValue(formKey,inputName,inputValue){
        const form = this.state[formKey];
        return {...this.state,[formKey]:{...form,[inputName]:inputValue}};
    }
    setChipsValue(formKey,chipsName,chipsValue){
        const form = this.state[formKey];
        return {...this.state,[formKey]:{...form,[chipsName]:chipsValue}};
    }
}

export default reducer;


