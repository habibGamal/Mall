import React from "react";
import preview from "../helpers/preview";
import Picture from "../models/Picture";
import { Main } from "../redux/dispatcher";
import PicturePosition from "../types/PicturePosition";
type PickPictureType = {
    toggleImg: React.MutableRefObject<HTMLImageElement>;
    imgBoundry: React.MutableRefObject<HTMLDivElement>;
    imgDrag: React.MutableRefObject<HTMLDivElement>;
    img: React.MutableRefObject<HTMLImageElement>;
    setRange: React.Dispatch<React.SetStateAction<number>>;
    setToggle: React.Dispatch<React.SetStateAction<boolean>>;
    picture: Picture;
}
export default class PickPicture {
    toggleImg: React.MutableRefObject<HTMLImageElement>;
    imgBoundry: React.MutableRefObject<HTMLDivElement>;
    imgDrag: React.MutableRefObject<HTMLDivElement>;
    img: React.MutableRefObject<HTMLImageElement>;
    setRange: React.Dispatch<React.SetStateAction<number>>;
    setToggle: React.Dispatch<React.SetStateAction<boolean>>;
    picture: Picture;
    constructor({ toggleImg, imgBoundry, imgDrag, img, setRange, setToggle, picture }: PickPictureType) {
        this.toggleImg = toggleImg;
        this.imgBoundry = imgBoundry;
        this.imgDrag = imgDrag;
        this.img = img;
        this.setRange = setRange;
        this.setToggle = setToggle;
        this.picture = picture;
    }
    async handle(e) {
        this.setRange(e.target.value);
        this.img.current.style.width = (this.imgBoundry.current.clientWidth * parseFloat(e.target.value)) + 'px';
        if (parseInt(this.img.current.style.width) <= -parseInt(this.imgDrag.current.style.left) || parseInt(this.img.current.style.height) <= -parseInt(this.imgDrag.current.style.top)) {
            this.imgDrag.current.style.top = '0';
            this.imgDrag.current.style.left = '0';
        }
    }
    ImgLoaded() {
        let boundries: [number, number] = [this.imgBoundry.current.clientWidth, this.imgBoundry.current.clientHeight];
        preview(this.imgDrag.current, this.img.current, boundries);
        if (this.picture.editMode) {
            this.adjustToggleImg(this.picture.position)
        }
    }
    adjustToggleImg(position: PicturePosition) {
        const { heightP, leftP, topP } = position || {};
        if (position) {
            const style = this.toggleImg.current.style;
            style.height = `${heightP}%`;
            style.objectPosition = `${isNaN(leftP) ? 0 : leftP}%`;
            style.top = `${isNaN(topP) ? 0 : topP}%`;
            style.objectFit = 'cover';
        }
    }
    tracking({ resized, deleted }: { resized?: boolean, deleted?: boolean }) {
        if (this.picture.tracking) {
            if (resized) {
                this.picture.tracking.resized = resized;
            }
            if (deleted) {
                this.picture.tracking.deleted = deleted;
            }
        }
    }
    // => when done button is clicked
    done(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        // => get height percentage , left and top percentage
        const { imgDrag, imgBoundry } = { imgDrag: this.imgDrag.current, imgBoundry: this.imgBoundry.current }
        const heightP = (imgDrag.clientHeight / imgBoundry.clientHeight) * 100;
        const leftP = (parseInt(imgDrag.style.left) * -1) / ((imgDrag.clientWidth - imgBoundry.clientWidth) / 100);
        const topP = (parseInt(imgDrag.style.top) / imgBoundry.clientHeight) * 100;
        this.picture.position = { heightP, leftP, topP };
        // => optimize the toggle image to the same percentage that we get
        this.adjustToggleImg(this.picture.position);
        // => track the picture : make the picture tracking = resized to upload the new position
        this.tracking({ resized: true });
        // => store the percentages in the global store
        Main.modifyPicture(this.picture.id, this.picture);
        // => toggle off
        this.setToggle(false);
    }
    remove() {
        // => track the picture : make the picture tracking = deleted to delete it from the DB
        this.tracking({ deleted: true });
        // => remove picutre from the global store
        Main.removePicture(this.picture.id);
    }
}