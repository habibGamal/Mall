import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import SliderPhoto from './SliderPhoto';
import { getChildrenByClassName } from '../../helpers/dom-collect';
export default function Slider() {
    const slider = useRef();
    const [left,setLeft] = useState({
        order:0,
        executer:function(i){
            return 100*(i+this.order)+'vw'
        }
    });
    const photos = [
        'slider_1.jpg',
        'slider_2.jpg',
        'slider_3.jpg',
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
