import { PopupLogin } from "../redux/do";
import { Router } from "../redux/getStateDirect"; 
export const MESSAGES = {
    loginFirst : <div>Please <strong className="message-link" onClick={()=>PopupLogin(true)}>login</strong> first</div>,
    userAlreadyLogin : <div>You are already loged in</div>,
    adminNotComplete : <div>'Please complete <strong className="message-link" onClick={()=>Router().push('/branch/create')}>setup</strong> first'</div>
}