import React, { useMemo, useRef, useState } from 'react'
import { connect } from 'react-redux';
import active from '../../helpers/active';
import preview from '../../helpers/preview';
import { removePicture, setPicturePosition } from '../../redux/actions/main';
function Preview({ imgSrc, previewT, setPreviewT, index, setPicturePosition, removePicture }) {
    const toggleImg = useRef(null);
    const imgBoundry = useRef(null);
    const imgDrag = useRef(null);
    const img = useRef(null);
    const [range, setRange] = useState(0);
    const [toggle, setToggle] = useState(false);
    useMemo(() => {
        if (!previewT) {
            setToggle(false);
        }
    }, [previewT]);
    async function handle(e) {
        setRange(e.target.value);
        img.current.style.width = (imgBoundry.current.clientWidth * parseFloat(e.target.value)) + 'px';
        if(parseInt(img.current.style.width) <= -parseInt(imgDrag.current.style.left) || parseInt(img.current.style.height) <= -parseInt(imgDrag.current.style.top) ){
            imgDrag.current.style.top = '0';
            imgDrag.current.style.left = '0';
        }
    }
    function ImgLoaded() {
        let boundries = [imgBoundry.current.clientWidth, imgBoundry.current.clientHeight];
        preview(imgDrag.current, img.current, boundries)
    }
    // => when done btn is clicked
    function done(e) {
        e.preventDefault();
        // => get height percentage , left and top percentage
        let heightP = (imgDrag.current.clientHeight / imgBoundry.current.clientHeight) * 100;
        let leftP = (parseInt(imgDrag.current.style.left) * -1) / ((imgDrag.current.clientWidth - imgBoundry.current.clientWidth) / 100);
        let topP = (parseInt(imgDrag.current.style.top) / imgBoundry.current.clientHeight) * 100;
        // => optimize the toggle image to the same percentage that we get
        toggleImg.current.style.height = heightP + '%';
        toggleImg.current.style.objectPosition = `${leftP}%`;
        toggleImg.current.style.top = topP + '%';
        // => store the percentages in the global store
        setPicturePosition({ index, percentages: { heightP, leftP, topP } });
    }
    function remove() {
        // => remove picutre from the global store
        removePicture(index);
    }
    return (
        <div className="preview-container">
            <div className="toggle-container">
                <button onClick={remove} type="button" className="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <img ref={toggleImg} className="toggle" onClick={() => { setPreviewT(true); setToggle(true) }} src={imgSrc} />
            </div>
            <div className={active(toggle, { defaultClass: 'preview' })}>
                <span className="toggle close" onClick={() => { setPreviewT(false); setToggle(false) }}>&times;</span>
                <div ref={imgBoundry} className="img-boundries">
                    <div ref={imgDrag} className="img-drag">
                        <img ref={img} onLoad={ImgLoaded} src={imgSrc} draggable="false" />
                    </div>
                </div>
                <div className="form-group range">
                    <label htmlFor="formControlRange">Zoom</label>
                    <input type="range" onChange={handle} value={range} min="1" step=".1" max="10" className="form-control-range" id="formControlRange" />
                </div>
                <button onClick={done} className="btn btn-primary">Done</button>
            </div>
        </div>
    )
}


export default connect(null, { setPicturePosition, removePicture })(Preview);