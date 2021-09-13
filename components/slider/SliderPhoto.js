import React from 'react'

export default function SliderPhoto({ name, left }) {
    return (
        <div className="photo" style={{ left }}>
            <img src={`./images/${name}`} />
        </div>
    )
}
