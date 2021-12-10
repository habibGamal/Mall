import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import active from '../../helpers/active';
import { Messages } from '../../redux/dispatcher';

export default function Message({index,type,content}) {
    const [showT,setShowT] = useState(true)
    const [removed,setRemoved] = useState(false);
    let t2;
    useEffect(()=>{
        const time = 5000;
        let t = setTimeout(()=>{
            setShowT(false);
        },time);
        t2 = setTimeout(()=>{
            Messages.clear(index);
        },time + 150);
        return ()=> {
            clearTimeout(t);
            clearTimeout(t2);
        }
    },[])
    function remove(){
        Messages.clear(index);
        clearTimeout(t2);
    }
    return (
        <div className={active(showT,{activeClass:'show',defaultClass:`alert alert-${type} alert-dismissible fade`})} role="alert">
            {content}
            <button onClick={remove} type="button" className="close">
                <span aria-hidden="true">×</span>
            </button>
        </div>
    )
}
