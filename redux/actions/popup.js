import * as t from '../types'
// - this file take care of popup windows
// + rule : action creator is camel case and async action creator is pascal case
export const initPopup = (key)=>({
    type: t.INIT_POPUP,
    payload: key
})

export const setPopup = (key,value,args)=>({
    type: t.SET_POPUP,
    payload: {key,value,args}
})

export const uninstallPopup = (key)=>({
    type: t.UNINSTALL_POPUP,
    payload: key
})