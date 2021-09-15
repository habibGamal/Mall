import React, { useReducer, useRef, useState } from 'react'
import active from '../../helpers/active'
import Sort from './Sort'
import Filter from './Filter'
import Search from './Search';

// note: T stand for Toggle (like: searchT=>searchToggle)
export default function Filtering({requirements}) {
    const [filterT,setFilterT] = useState(false);
    if(requirements === undefined){
        requirements = [
            'sort','filter','search'
        ];
    }
    function requirement(name,key){
        switch(name) {
            case 'sort':
                return <Sort key={key} />
            case 'filter':
                return <Filter key={key} filterT={filterT} setFilterT={setFilterT}/>
            case 'search':
                return <Search key={key} />
        }
    }
    return (
        <>
            <div onClick={() => setFilterT(false)} className={active(filterT, { defaultClass: 'escape-effect' })} />
            <ul className="filters">
                {requirements.map((r,i)=>requirement(r,i))}
            </ul>
        </>
    )
}
