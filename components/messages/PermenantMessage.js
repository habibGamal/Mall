import React from 'react'

export default function PermenantMessage({type,content}) {
    return (
        <div className={`show alert alert-${type} fade`} role="alert">
            {content}
        </div>
    )
}
