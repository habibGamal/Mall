import React from 'react'

export default function Loading({ children, state }) {

    return (
        <>
            {state
                ? children
                : <div className="loading">
                </div>
            }
        </>
    )
}
