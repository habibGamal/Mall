import React, { useState } from 'react'
import t from '../../helpers/translate'
export default function Filter({ setFilterT }) {
    return (
        <li id="filter">
            <span onClick={() => setFilterT(true)}>
                <i className="fas fa-filter" /> {t('Filter','فرز')}
            </span>
        </li >
    )
}
