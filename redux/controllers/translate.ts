// state type
type TranslateStateType = {
    language: string;
}
// initial state
export const initState: TranslateStateType = {
    language: 'en',
}

// state management
export class State {
    static to = 'Translate';
    public state: TranslateStateType;
    constructor(state: TranslateStateType) {
        this.state = state;
    }
    setLanguage(lang:string){
        return {language:lang};
    }
}


