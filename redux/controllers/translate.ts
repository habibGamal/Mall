// Reducer Name
const reducerName = 'translate';
// state type
type TranslateStateType = {
    language: string;
}
// initial state
const initState: TranslateStateType = {
    language: 'ar',
}
// controller(it is control what function will be executed) => reducer
const reducer = (state = initState, action) => {
    const manageState = new State(state);
    if (action.to === reducerName) {
        if (manageState[action.type]) {
            return manageState[action.type](...action.payload);
        }
    }
    return state;

}

// state management
export class State {
    public state: TranslateStateType;
    constructor(state: TranslateStateType) {
        this.state = state;
    }
    setLanguage(lang:string){
        return {language:lang};
    }
}

export default reducer;


