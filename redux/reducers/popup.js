import * as t from '../types'


const messages = (state = {}, action) => {
    switch (action.type) {
        case t.INIT_POPUP:
            return { ...state, [action.payload]: false };
        case t.UNINSTALL_POPUP:
            delete state[action.payload];
            return {...state};
        case t.SET_POPUP:
            return { ...state, [action.payload.key]: action.payload.value , args:action.payload.args };
        default:
            return state;
    }
}

export default messages;