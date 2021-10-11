import React from 'react'

export default function NotEmpty({ arr, children }) {
    return (
        <>
            {arr.length !== 0 ? children:''}
        </>
    )
}
