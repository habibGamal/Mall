import preview from "../helpers/preview";
import { Main } from "../redux/dispatcher";

export default class PickPicture {
    constructor(setting = { toggleImg, imgBoundry, imgDrag, img, setRange, setToggle, index, byId }) {
        this.toggleImg = setting.toggleImg;
        this.imgBoundry = setting.imgBoundry;
        this.imgDrag = setting.imgDrag;
        this.img = setting.img;
        this.setRange = setting.setRange;
        this.setToggle = setting.setToggle;
        this.index = setting.index;
        this.byId = setting.byId;
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
        let boundries = [this.imgBoundry.current.clientWidth, this.imgBoundry.current.clientHeight];
        preview(this.imgDrag.current, this.img.current, boundries)
    }
    // => when done button is clicked
    done(e) {
        e.preventDefault();
        // => get height percentage , left and top percentage
        const { imgDrag, imgBoundry } = { imgDrag: this.imgDrag.current, imgBoundry: this.imgBoundry.current }
        const heightP = (imgDrag.clientHeight / imgBoundry.clientHeight) * 100;
        const leftP = (parseInt(imgDrag.style.left) * -1) / ((imgDrag.clientWidth - imgBoundry.clientWidth) / 100);
        const topP = (parseInt(imgDrag.style.top) / imgBoundry.clientHeight) * 100;
        // => optimize the toggle image to the same percentage that we get
        const style = this.toggleImg.current.style;
        style.height = heightP + '%';
        style.objectPosition = `${leftP}%`;
        style.top = topP + '%';
        // => store the percentages in the global store
        if (this.byId) {
            Main.setPicturePositionById(this.index, { heightP, leftP, topP });
        } else {
            Main.setPicturePosition(this.index, { heightP, leftP, topP });
        }
        // => toggle off
        this.setToggle(false);
    }
    remove() {
        // => remove picutre from the global store
        if (this.byId) {
            Main.removePictureById(this.index);
        } else {
            Main.removePicture(this.index);
        }
    }
}