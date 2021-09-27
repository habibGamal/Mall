import { clearMessage, setMessage } from "./actions/messages"
import store from "./store"

export const SetMessage = (type,content)=>{
    store.dispatch(setMessage(type,content));
}

export const ClearMessage = (index)=>{
    store.dispatch(clearMessage(index));
}