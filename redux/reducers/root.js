import { combineReducers } from "redux";
import main from "./main";
import router from './router';
import form from './form';
import messages from './messages';
import apiFlow from './apiFlow';
import popup from './popup';
const rootReducer = combineReducers({
    main,
    router,
    form,
    messages,
    apiFlow,
    popup,
})
export default rootReducer;