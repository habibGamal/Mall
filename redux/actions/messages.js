import store from '../store'
import * as t from '../types'
// - this file take care of displaying messages and clear it
// + rule : action creator is camel case and async action creator is pascal case
export const setMessage = (type,content)=>({
    type: t.SET_MESSAGE,
    payload: {type,content}
})

export const clearMessage = (index)=>({
    type: t.CLEAR_MESSAGE,
    payload: index
})
