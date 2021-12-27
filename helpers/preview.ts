import draggable from "./draggable";
export default function preview(imgDrag: HTMLDivElement, img: HTMLImageElement, [boundryW, boundryH]: [number, number]) {
    draggable(imgDrag, [boundryW, boundryH]);
}