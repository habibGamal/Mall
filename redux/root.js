import { combineReducers } from "redux";
import main from './controllers/main';
import router from './controllers/router';
import messages from './controllers/messages';
import popup from './controllers/popup';
import forms from './controllers/forms';
import apiData from './controllers/apiData';
const rootReducer = combineReducers({
    main,
    router,
    apiData,
    popup,
    messages,
    forms,
})
export default rootReducer;