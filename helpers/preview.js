import draggable from "./draggable";
export default function preview(imgDrag,img,[boundryW,boundryH]){
    let imgSize = [img.clientWidth,img.clientHeight];
    draggable(imgDrag,[boundryW,boundryH]);
}