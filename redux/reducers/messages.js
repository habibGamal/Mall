import * as t from '../types'


const messages = (state = [], action) => {
    switch (action.type) {
        case t.SET_MESSAGE:
            return [...state,{index:new Date().getTime(),type:action.payload.type,content:action.payload.content}];
        case t.CLEAR_MESSAGE:
            let newState = state.filter((m)=>m.index!==action.payload);
            return newState;
        default:
            return state;
    }
}

export default messages;