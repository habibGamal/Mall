import React, { useState } from 'react'
import active from '../../helpers/active';

export default function Filter({filterT ,setFilterT}) {
    return (
        <li id="filter">
            <span onClick={() => setFilterT(true)}>
                <i className="fas fa-filter" /> Filter
            </span>
            <div className={active(filterT, { defaultClass: 'filter' })}>
                <h3 className="text-center">Filter</h3>
            </div>
        </li>
    )
}
