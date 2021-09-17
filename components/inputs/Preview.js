import React, { useMemo, useRef, useState } from 'react'
import preview from '../../helpers/preview';
export default function Preview({imgSrc,previewT,setPreviewT}) {
    const toggleImg = useRef(null);
    const imgBoundry = useRef(null);
    const imgDrag = useRef(null);
    const img = useRef(null);
    const [range,setRange] = useState(0);
    const [toggle,setToggle] = useState(false);
    useMemo(()=>{
        if(!previewT){
            setToggle(false);
        }
    },[previewT]);
    async function handle(e){
        setRange(e.target.value);
        let magnification = imgBoundry.current.clientWidth*parseFloat(e.target.value);
        // console.log(magnification);
        img.current.style.width = (imgBoundry.current.clientWidth*parseFloat(e.target.value))+'px';
        imgDrag.current.style.top = '0';
        imgDrag.current.style.left = '0';
    }
    function ImgLoaded(){
        let boundries = [imgBoundry.current.clientWidth,imgBoundry.current.clientHeight];
        preview(imgDrag.current,img.current,boundries)
    }
    function done(e){
        e.preventDefault();
        let heightP = (imgDrag.current.clientHeight/imgBoundry.current.clientHeight)*100;
        let leftP = (parseInt(imgDrag.current.style.left)*-1 ) / ((imgDrag.current.clientWidth-imgBoundry.current.clientWidth)/100);
        toggleImg.current.style.height = heightP+'%';
        toggleImg.current.style.objectPosition = `${leftP}%`;
    }
    return (
        <div className="preview-container">
            <div className="toggle-container">
                <img ref={toggleImg} className="toggle" onClick={()=>{setPreviewT(true); setToggle(true)}} src={imgSrc} />
            </div>
            <div className={toggle ? 'preview active':'preview'}>
                <span className="toggle" onClick={()=>{setPreviewT(false); setToggle(false)}}>close</span>
                <div ref={imgBoundry} className="img-boundries">
                    <div ref={imgDrag} className="img-drag">
                        <img ref={img} onLoad={ImgLoaded} src={imgSrc} draggable="false"/>
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