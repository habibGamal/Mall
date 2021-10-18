import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk';
import reducer from './root'

const store = createStore(reducer,applyMiddleware(thunk))
export default store;