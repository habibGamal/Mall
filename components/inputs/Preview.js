import React, { useRef, useState } from 'react'
import { connect } from 'react-redux';
import active from '../../helpers/active';
import preview from '../../helpers/preview';
import { Main } from '../../redux/dispatcher';
function Preview({ imgSrc, index, to, byId}) {
    // note: index is considered as id in case of byId is true
    const toggleImg = useRef(null);
    const imgBoundry = useRef(null);
    const imgDrag = useRef(null);
    const img = useRef(null);
    const [range, setRange] = useState(0);
    const [toggle, setToggle] = useState(false);
    async function handle(e) {
        setRange(e.target.value);
        img.current.style.width = (imgBoundry.current.clientWidth * parseFloat(e.target.value)) + 'px';
        if (parseInt(img.current.style.width) <= -parseInt(imgDrag.current.style.left) || parseInt(img.current.style.height) <= -parseInt(imgDrag.current.style.top)) {
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
        if (byId) {
            Main.setPicturePositionById(index, { heightP, leftP, topP });
        } else {
            Main.setPicturePosition(index, { heightP, leftP, topP });
        }
        // => toggle off
        setToggle(false);
    }
    function remove() {
        // => remove picutre from the global store
        if (byId) {
            Main.removePictureById(index);
        } else {
            Main.removePicture(index);
        }
    }
    return (
        <div className="preview-container">
            <div onClick={() => setToggle(false)} className={active(toggle, { defaultClass: 'escape-effect' })}></div>
            <button onClick={remove} type="button" className="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <div className={`toggle-container ${to}`}>
                <img ref={toggleImg} className="toggle" onClick={() => setToggle(true)} src={imgSrc} />
            </div>
            <div className={active(toggle, { defaultClass: 'preview' })}>
                <span className="toggle close" onClick={() => setToggle(false)}>&times;</span>

                <div ref={imgBoundry} className={`img-boundries ${to}`}>
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


export default connect(null)(Preview);