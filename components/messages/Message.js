import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import active from '../../helpers/active';
import { ClearMessage } from '../../redux/dispatchDirect';

function Message({index,type,content}) {
    const [showT,setShowT] = useState(true)
    useEffect(()=>{
        let t = setTimeout(()=>{
            setShowT(false);
            setTimeout(()=>{
                ClearMessage(index);
            },150);
        },2000);
        return ()=> clearTimeout(t);
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

export default connect()(Message);