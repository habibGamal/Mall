import * as t from '../types'
import category from '../../api/category'
// - this file to get all data for specific model from backend and handle it
// + rule : action creator is camel case and async action creator is pascal case
export const getCategories = (data)=>({
    type: t.GET_CATEGORIES,
    payload: data
})

export const deleteCategory = (id)=>({
    type: t.DELETE_CATEGORY,
    payload: id
})

export const clearCategories = ()=>({
    type: t.CLEAR_CATEGORIES,
})

export const GetCategories = ()=>{
    return async (dispatch)=>{
        let res = await category.index();
        if(res.status === 200){
            dispatch(getCategories(res.data));
        }
    }
}
