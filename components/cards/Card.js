import React from 'react'

export default function Card({className,title,icon,value,unit}) {
    return (
        <div className="col-lg-4 ">
            <div className={`card ${className}`}>
                <h2>{title}</h2>
                <div className="icon">
                    <i className={icon}></i>
                </div>
                <div className="text">
                    <span className="value">{value}</span> {unit}
                </div>
            </div>
        </div>
    )
}
