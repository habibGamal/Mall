import React from 'react'
import CheckBox from '../../inputs/CheckBox'

export default function Specification({name,options}) {
    let listOptions = options.map((option,i)=><CheckBox key={i} label={option} id={option.toLowerCase()} addClass="" />)
    return (
        <div className="specification">
            <h5>{name}</h5>
            <div className="options">
                {listOptions}
            </div>
        </div>
    )
}
