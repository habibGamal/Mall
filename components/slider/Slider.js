import React, { useEffect, useRef, useState } from 'react'
import SliderPhoto from './SliderPhoto';
export default function Slider() {
    const slider = useRef();
    useEffect(()=>{
        const optimizeSlider = ()=>{
            let children = slider.current.children;
            slider.current.style.height = children[children.length-1].clientHeight+'px';
        }
        optimizeSlider();
        window.onresize = optimizeSlider
        return ()=>{
            window.onresize = undefined;
        }
    },[])
    const [left,setLeft] = useState({
        order:0,
        executer:function(i){
            return 100*(i+this.order)+'vw'
        }
    });
    const photos = [
        'slide-1.png',
        'slide-2.png',
        'slide-3.png',
    ]
    function toLeft(){
        if(left.order !== 0){
            setLeft(old => ({
                order:old.order-1,
                executer:function(i){
                    return 100*(i-this.order)+'vw'
                }
            }));
        }else {
            setLeft(old => ({
                order:2,
                executer:function(i){
                    return 100*(i-this.order)+'vw'
                }
            }));
        }
    }
    function toRight(){
        if(left.order <  (photos.length - 1) ){
            setLeft(old => ({
                order:old.order+1,
                executer:function(i){
                    return 100*(i-this.order)+'vw'
                }
            }));
        }else {
            setLeft(old => ({
                order:0,
                executer:function(i){
                    return 100*(i-this.order)+'vw'
                }
            }));
        }
    }
    return (
        <div ref={slider} className="slider">
            <div onClick={toRight} className="right-arrow">
                <i className="fas fa-chevron-right"></i>
            </div>
            <div onClick={toLeft} id="prev-slide" className="left-arrow">
                <i className="fas fa-chevron-left"></i>
            </div>
            {photos.map((photo,i)=><SliderPhoto key={i} name={photo} left={left.executer(i)}/>)}
        </div>
    )
}
