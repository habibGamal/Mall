import { combineReducers } from "redux";
import { State as ApiDataState, initialState as ApiDataInitState } from './controllers/api_data';
import { State as CustomerEnvState, initState as CustomerEnvInitState } from './controllers/customer_env';
import { State as FormsState } from "./controllers/forms";
import { initState as MainInitState, State as MainState } from './controllers/main';
import { State as MessagesState } from "./controllers/messages";
import { State as PopupState } from './controllers/popup';
import { State as RouterState } from './controllers/router';
import { initState as LangInitState, State as LanguageState } from "./controllers/translate";
type ActionType = {
    to: string,
    type: string,
    payload: any;
}
const reducer = (state: any, action: ActionType, _class: any) => {
    if (action.to === _class.to) {
        const manageState = new _class(state);
        if (manageState[action.type]) {
            return manageState[action.type](...action.payload);
        }
    }
    return state;
}
const rootReducer = combineReducers({
    apiData: (state = ApiDataInitState, action) => reducer(state, action, ApiDataState),
    customerEnv: (state = CustomerEnvInitState, action) => reducer(state, action, CustomerEnvState),
    forms: (state = LangInitState, action) => reducer(state, action, FormsState),
    main: (state = MainInitState, action) => reducer(state, action, MainState),
    messages: (state = [], action) => reducer(state, action, MessagesState),
    popup: (state = {}, action) => reducer(state, action, PopupState),
    router: (state = {}, action) => reducer(state, action, RouterState),
    translate: (state = {}, action) => reducer(state, action, LanguageState),
})
export default rootReducer;