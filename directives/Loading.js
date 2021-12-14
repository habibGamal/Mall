import React from 'react'

export default function Loading({ children, state }) {

    return (
        <>
            {state
                ? children
                :
                <div className="loading-container">
                    <div className="loading">
                    </div>
                </div>
            }
        </>
    )
}
