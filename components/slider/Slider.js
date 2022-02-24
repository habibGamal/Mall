import React from 'react'
import active from '../../helpers/active';
export default function Slider() {
    const photos = [
        'slide-2.png',
        'slide-1.png',
    ]
    return (
        <>
            <div id="mainSlider" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#mainSlider" data-slide-to="0" className="active"></li>
                    <li data-target="#mainSlider" data-slide-to="1"></li>
                </ol>
                <div className="carousel-inner">
                    {photos.map((photo,i) => (
                        <div key={i} className={active(i==0,{defaultClass:'carousel-item'})}>
                            <img src={`./images/${photo}`} className="d-block w-100" alt="..." />
                        </div>
                    ))}
                </div>
                <a className="carousel-control-prev" href="#mainSlider" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#mainSlider" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        </>
    )
}
