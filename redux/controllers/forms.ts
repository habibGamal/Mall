// state management
export class State {
    static to = 'Forms';
    state: Object;
    constructor(state: Object) {
        this.state = state;
    }
    attachForm(formKey: string) {
        if (!this.state[formKey]) {
            return { ...this.state, [formKey]: {} };
        }
        return this.state;
    }
    unattachForm(formKey: string) {
        delete this.state[formKey];
        return { ...this.state };
    }
    emptyForm(formKey: string) {
        return { ...this.state, [formKey]: {} };
    }
    setInputValue(formKey: string, inputName:string, inputValue:any) {
        const form = this.state[formKey];
        return { ...this.state, [formKey]: { ...form, [inputName]: inputValue } };
    }
    setChipsValue(formKey: string, chipsName:string, chipsValue:any) {
        const form = this.state[formKey];
        return { ...this.state, [formKey]: { ...form, [chipsName]: chipsValue } };
    }
}


