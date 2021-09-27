import * as t from '../types'
const router = (state={router:null},action)=>{
    if(action.type === t.ROUTER){
        return {router:action.payload};
    }
    return state;
}

export default router;