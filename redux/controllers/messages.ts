type Message = { index: number, type: string, content: string }
type MessageState = Message[]
// state management
export class State {
    static to = 'Messages';
    state: MessageState;
    constructor(state:MessageState) {
        this.state = state;
    }
    set(type: string, content: any) {
        const prevMessage = this.state[this.state.length - 1];
        if (type !== prevMessage?.type && content !== prevMessage?.content) {
            return [...this.state, { index: new Date().getTime(), type, content }]
        }
        return this.state;
    }
    clear(index) {
        let newState = this.state.filter((m) => m.index !== index);
        return newState;
    }
}