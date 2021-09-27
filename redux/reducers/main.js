import * as t from '../types'


const main = (state={counter:1,authenticated:null,pictures:[]},action)=>{
    switch(action.type){
        case t.AUTHENTICATED:
            return {...state,authenticated:action.payload}
        case t.COUNTER:
            return {...state,counter:action.payload};
        case t.PRODUCT_PICTURE:
            return {...state,pictures:[...state.pictures,{picture:action.payload.picture,base:action.payload.base,position:null}]};
        case t.PRODUCT_PICTURE_REMOVE:
            let picturesB1 = state.pictures.filter((picture,i)=>i!==action.payload);
            return {...state,pictures:picturesB1};
        case t.PRODUCT_PICTURE_POSITION:
            let picturesB2 = state.pictures;
            picturesB2[action.payload.index].position = action.payload.percentages;
            return {...state,pictures:picturesB2};
        default :
            return state;
    }
}

export default main;