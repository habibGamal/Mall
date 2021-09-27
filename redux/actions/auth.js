import auth from '../../api/auth'
import * as t from '../types'
// - this file take care of all authentication and authorization actions
// + rule : action creator is camel case and aciton dispatch with thunk is pascal case
export const authenticating = (loginState)=>({
    type: t.AUTHENTICATED,
    payload: loginState
})

const Authenticating = ()=>{
    return async (dispatch)=>{
        let res = await auth.isAuthenticated();
        dispatch(authenticating(res.data));
    }
}
export {Authenticating as Reauth}