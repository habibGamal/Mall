
// state management {}
export class State {
    static to = 'Router';
    state: object
    constructor(state:object) {
        this.state = state;
    }
    set(router) {
        return router;
    }
}



