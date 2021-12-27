import React from 'react'

export default function Loading({ children, state }: { children: JSX.Element | JSX.Element[], state?: boolean }) {

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
