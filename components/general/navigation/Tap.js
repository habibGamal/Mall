import React from 'react'
import active from '../../../helpers/active'

export default function Tap({setExpand,setActiveTap,activeTap,name,children}) {

    return (
        <li 
            onClick={()=>{
                setActiveTap(name);
                setExpand(false);
            }} 
            data-name={name} 
            className={active(activeTap===name)}
        >
            {children}
        </li>
    )
}
