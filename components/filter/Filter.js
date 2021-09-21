import React, { useState } from 'react'
export default function Filter({ setFilterT }) {
    return (
        <li id="filter">
            <span onClick={() => setFilterT(true)}>
                <i className="fas fa-filter" /> Filter
            </span>
        </li >
    )
}
