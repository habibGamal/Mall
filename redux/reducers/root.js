import { combineReducers } from "redux";
import main from "./main";
import router from './router';
import form from './form';
import messages from './messages';
const rootReducer = combineReducers({
    main,
    router,
    form,
    messages,
})
export default rootReducer;