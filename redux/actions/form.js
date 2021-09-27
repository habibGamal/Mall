import * as t from '../types'
// - this file take care of inputs in any form to clear it or handle it
// + rule : action creator is camel case and async action creator is pascal case
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