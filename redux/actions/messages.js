import store from '../store'
import * as t from '../types'
// - this file take care of all authentication and authorization actions
// + rule : action creator is camel case and aciton dispatch with thunk is pascal case
export const setMessage = (type,content)=>({
    type: t.SET_MESSAGE,
    payload: {type,content}
})

export const clearMessage = (index)=>({
    type: t.CLEAR_MESSAGE,
    payload: index
})
