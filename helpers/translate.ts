import store from "../redux/store";

export default function t(en:string,ar:string):string {
    const state = store.getState();
    if(state.translate.language == 'ar'){
        return ar;
    }
    return en;
}

export function translate(state){
    return {
        lang:state.translate.language
    }
}
