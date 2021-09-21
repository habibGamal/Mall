import React from 'react'
import Input from '../../inputs/Input'

export default function Specification({name,options}) {
    let listOptions = options.map((option,i)=><Input key={i} label={option} id={option.toLowerCase()} type="check" addClass="" />)
    return (
        <div className="specification">
            <h5>{name}</h5>
            <div className="options">
                {listOptions}
            </div>
        </div>
    )
}
