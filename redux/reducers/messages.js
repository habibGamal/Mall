import * as t from '../types'


const messages = (state = [], action) => {
    switch (action.type) {
        case t.SET_MESSAGE:
            return [...state,{index:state.length,type:action.payload.type,content:action.payload.content}];
        case t.CLEAR_MESSAGE:
            let newState = state.filter((m,i)=>i!==action.payload);
            return newState;
        default:
            return state;
    }
}

export default messages;