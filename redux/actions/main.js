import * as t from '../types'

// => counter for test
export const setCounter = (count)=>({
    type: t.COUNTER,
    payload: count
})
// => to save uploaded pictures from create product page
export const setPicture = (picture)=>({
    type: t.PRODUCT_PICTURE,
    payload: picture
})
// => to save uploaded pictures from create product page
export const removePicture = (index)=>({
    type: t.PRODUCT_PICTURE_REMOVE,
    payload: index
})
// => to save uploaded picture's position from create product page
export const setPicturePosition = (picturePosition)=>({
    type: t.PRODUCT_PICTURE_POSITION,
    payload: picturePosition
})