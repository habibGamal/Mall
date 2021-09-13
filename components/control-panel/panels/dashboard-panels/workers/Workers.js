import React from 'react'
import Worker from './Worker'

export default function Workers() {
    return (
        <>
            <div className="controllers">
                <button className="btn btn-add mx-auto"><i className="fas fa-plus-circle" /> Add Worker</button>
            </div>
            <div className="workers">
                <div className="row">
                    <Worker />
                    <Worker />
                    <Worker />
                </div>
            </div>
        </>
    )
}
