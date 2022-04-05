// state management
export class State {
    static to = 'Popup';
    state: object;
    constructor(state: object) {
        this.state = state;
    }
    init(key: string) {
        return { ...this.state, [key]: false };
    }
    setPopup(key: string, value: boolean, args?: any) {
        return { ...this.state, [key]: value, args };
    }
    uninstallPopup(key: string) {
        delete this.state[key];
        return { ...this.state };
    }
}


