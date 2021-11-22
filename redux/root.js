import { combineReducers } from "redux";
import main from './controllers/main';
import router from './controllers/router';
import messages from './controllers/messages';
import popup from './controllers/popup';
import forms from './controllers/forms';
import apiData from './controllers/apiData';
import customerEnv from './controllers/customerEnv';
const rootReducer = combineReducers({
    main,
    router,
    apiData,
    customerEnv,
    popup,
    messages,
    forms,
})
export default rootReducer;