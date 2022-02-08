import React from 'react'
import active from '../helpers/active'

export default function Loading({ children, state , mini }: { children: JSX.Element | JSX.Element[], state?: boolean,mini?:boolean }) {

    return (
        <>
            {state
                ? children
                :
                <div className={active(mini,{activeClass:'mini-loading-container',falseClass:'loading-container'})}>
                    <div className="loading">
                    </div>
                </div>
            }
        </>
    )
}
