import store from "../store";
// Types
class Type {
    static set = 'set_message';
    static clear = 'clear_message';
}

// controller(it is control what function will be executed) => reducer
const messagesController = (state = [], action) => {
    const Messages = new MessagesState(state);
    switch (action.type) {
        case Type.set:
            const { type, content } = action.payload;
            return Messages.set(type, content);
        case Type.clear:
            return Messages.clear(action.payload);
        default:
            return state;
    }
}

// state management
class MessagesState {
    constructor(state) {
        this.state = state;
    }
    set(type, content) {
        return [...this.state, { index: new Date().getTime(), type, content }]
    }
    clear(index) {
        let newState = this.state.filter((m) => m.index !== index);
        return newState;
    }
}

// dispatcher
export class Messages {
    static set(type, content) {
        store.dispatch({
            type: Type.set,
            payload: { type, content }
        })
    }
    static clear(index) {
        store.dispatch({
            type: Type.clear,
            payload: index
        })
    }
}

export default messagesController;