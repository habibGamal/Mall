import { State as MainState } from "./controllers/main";
import { State as FormsState } from "./controllers/forms";
import { State as LanguageState } from "./controllers/translate";
import { State as MessagesState } from "./controllers/messages";
import { State as RouterState } from './controllers/router';
import { State as PopupState } from './controllers/popup';
import { State as ApiDataState } from './controllers/api_data';
import { State as CustomerEnvState } from './controllers/customer_env';
import store from "./store";
const dispatcher = {
    get: function (target, prop) {
        return (...payload) => {
            store.dispatch({
                to: target.to,
                type: prop,
                payload: payload
            });
        }
    }
}
export const Forms: FormsState = new Proxy({ to: FormsState.to }, dispatcher);

export const Messages: MessagesState = new Proxy({ to: MessagesState.to }, dispatcher);

export const ApiData: ApiDataState = new Proxy({ to: 'ApiData' }, dispatcher);

export const Main: MainState = new Proxy({ to: MainState.to }, dispatcher);

export const Language: LanguageState = new Proxy({ to: LanguageState.to }, dispatcher);

export const Popup: PopupState = new Proxy({ to: 'Popup' }, dispatcher);

export const Router: RouterState = new Proxy({ to: 'Router' }, dispatcher);

export const customerEnv: CustomerEnvState = new Proxy({ to: 'CustomerEnv' }, dispatcher);