import React, { useState } from 'react'
import active from '../../../helpers/active';
import Tap from './Tap';

export default function Navigation({activeTap,setActiveTap,taps}) {
    const [expand,setExpand] = useState(false);
    let smOnlyData = {};
    let listTaps = taps.map(
        (tap,i)=>{
            smOnlyData[tap.name] = tap.content;
            return <Tap key={i} setActiveTap={setActiveTap} setExpand={setExpand} activeTap={activeTap} name={tap.name} >{tap.content}</Tap>
        }
    )
    return (
        <div className="navigation">
            <div className="sm-only" onClick={()=>setExpand(!expand)}>
                <span>{smOnlyData[activeTap]}</span>
                <i className="fas fa-chevron-down" />
            </div>
            <ul className={active(expand,{activeClass:'expand'})}>
                {listTaps}
            </ul>
        </div>
    )
}
