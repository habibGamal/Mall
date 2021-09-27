import * as t from '../types'
// - this file take care of all authentication and authorization actions
// + rule : action creator is camel case and aciton dispatch with thunk is pascal case
export const attachForm = (formKey)=>({
    type: t.ATTACH_FORM,
    payload: formKey
})

export const unAttachForm = (formKey)=>({
    type: t.UN_ATTACH_FORM,
    payload: formKey
})

export const emptyForm = (formKey)=>({
    type: t.EMPTY_FORM,
    payload: formKey
})

export const setInputValue = (formKey,inputName,inputValue)=>({
    type: t.INPUT_VALUE,
    payload: {formKey,inputName,inputValue}
})