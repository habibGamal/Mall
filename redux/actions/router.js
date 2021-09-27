import * as t from '../types'

// => counter for test
export const setRouter = (router)=>({
    type: t.ROUTER,
    payload: router
})
