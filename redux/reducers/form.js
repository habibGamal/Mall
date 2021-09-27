import * as t from '../types'


const form = (state={},action)=>{
    switch(action.type){
        case t.ATTACH_FORM:
            return {...state,[action.payload]:{}}
        case t.UN_ATTACH_FORM:
            delete state[action.payload];
            return {...state};
        case t.EMPTY_FORM:
            return {...state,[action.payload]:{}}
        case t.INPUT_VALUE:
            let key = action.payload.formKey;
            let form = state[key];
            return {...state,[key]:{...form,[action.payload.inputName]:action.payload.inputValue}};
        default :
            return state;
    }
}

export default form;