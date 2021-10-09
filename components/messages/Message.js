import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import active from '../../helpers/active';
import { Messages } from '../../redux/stateControllers/messages';

export default function Message({index,type,content}) {
    const [showT,setShowT] = useState(true)
    useEffect(()=>{
        let t = setTimeout(()=>{
            setShowT(false);
        },1500);
        let t2 = setTimeout(()=>{
            Messages.clear(index);
        },1650);
        return ()=> {
            clearTimeout(t);
            clearTimeout(t2);
        }
    },[])
    return (
        <div className={active(showT,{activeClass:'show',defaultClass:`alert alert-${type} alert-dismissible fade`})} role="alert">
            {content}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">×</span>
            </button>
        </div>
    )
}
