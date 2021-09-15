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
    function requirement(name){
        switch(name) {
            case 'sort':
                return <Sort />
            case 'filter':
                return <Filter filterT={filterT} setFilterT={setFilterT}/>
            case 'search':
                return <Search />
        }
    }
    return (
        <>
            <div onClick={() => setFilterT(false)} className={active(filterT, { defaultClass: 'escape-effect' })} />
            <ul className="filters">
                {requirements.map((r)=>requirement(r))}
            </ul>
        </>
    )
}
