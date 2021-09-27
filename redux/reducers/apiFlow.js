import * as t from '../types'

const initialState = {
    categories:[],
}
function filtering(c,id){
    if(c.sub_categories.length !== 0){
        c.sub_categories = c.sub_categories.filter(cc=>filtering(cc,id));
    }
    return c.id !== id;
}
const apiFlow = (state=initialState,action)=>{
    switch(action.type){
        case t.GET_CATEGORIES:
            return {...state,categories:action.payload};
        case t.DELETE_CATEGORY:
            let categories = state.categories.filter(c=>filtering(c,action.payload));
            return {...state,categories};
        case t.CLEAR_CATEGORIES:
            return {...state,categories:[]};
        default :
            return state;
    }
}

export default apiFlow;