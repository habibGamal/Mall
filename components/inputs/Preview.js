import React, { useRef, useState } from 'react'
import { connect } from 'react-redux';
import active from '../../helpers/active';
import PickPicture from '../../packeges/PickPicture';
function Preview({ imgSrc, index, to, byId }) {
    // note: index is considered as id in case of byId is true
    const toggleImg = useRef(null);
    const imgBoundry = useRef(null);
    const imgDrag = useRef(null);
    const img = useRef(null);
    const [range, setRange] = useState(0);
    const [toggle, setToggle] = useState(false);
    const pickPicture = new PickPicture({ toggleImg, imgBoundry, imgDrag, img, setRange, setToggle ,index, byId });
    
    return (
        <div className="preview-container">
            <div onClick={() => setToggle(false)} className={active(toggle, { defaultClass: 'escape-effect' })}></div>
            <button onClick={()=>pickPicture.remove()} type="button" className="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <div className={`toggle-container ${to}`}>
                <img ref={toggleImg} className="toggle" onClick={() => setToggle(true)} src={imgSrc} />
            </div>
            <div className={active(toggle, { defaultClass: 'preview' })}>
                <span className="toggle close" onClick={() => setToggle(false)}>&times;</span>

                <div ref={imgBoundry} className={`img-boundries ${to}`}>
                    <div ref={imgDrag} className="img-drag">
                        <img ref={img} onLoad={()=>pickPicture.ImgLoaded()} src={imgSrc} draggable="false" />
                    </div>
                </div>
                <div className="form-group range">
                    <label htmlFor="formControlRange">Zoom</label>
                    <input type="range" onChange={(e)=>pickPicture.handle(e)} value={range} min="1" step=".1" max="10" className="form-control-range" id="formControlRange" />
                </div>
                <button onClick={(e)=>pickPicture.done(e)} className="btn btn-primary">Done</button>
            </div>
        </div>
    )
}


export default connect(null)(Preview);