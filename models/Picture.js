import handlePath from "../helpers/picturePath";
import showFiles from "../helpers/showFiles";
import { Main } from "../redux/dispatcher";

export default class Picture {
    constructor({ file = null, path = null, base = null, position = null, id = null, editMode = null }) {
        this.base = base;
        this.position = position;
        this.file = file
        this.id = id;
        this.path = path;
        this.editMode = editMode;
    }
    positionToJson() {
        return JSON.stringify(this.position);
    }
    // => get picture from Backend to display them 
    static getPicture(product) {
        // => just get the first picture
        const [{ path, position }] = JSON.parse(product.pictures);
        return new Picture({ path: handlePath(path), position: position ?? { "leftP": 50, "topP": 0 } });
    }
    // => get pictures from Backend to display them 
    static getPictures(product) {
        const pictures = JSON.parse(product.pictures);
        return pictures.map(({ path, position }) => new Picture({ path: handlePath(path), position: position ?? { "leftP": 50, "topP": 0 } }));
    }
    // => when user upload the pictures we update the global store
    static init(e, id = null) {
        let files = e.target?.files;
        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                showFiles(files[i]).then(e => {
                    // => files[i] is the whole file
                    // => base is the base64 of the file
                    const picture = new Picture({ file: files[i], base: e.target.result, position: null, id: id ?? Math.random() * Date.now() })
                    Main.setPicture(picture);
                });
            }
        }
    }

    // => get pictures from Backend to edit their positions or delete them , we get the row path not the handled one
    static rowPaths(rowPictures) {
        const pictures = JSON.parse(rowPictures);
        return pictures.map(({ path }) => path);
    }
    static rowPositions(rowPictures) {
        const pictures = JSON.parse(rowPictures);
        return pictures.map(({ position }) => position);
    }
    static getEditModePictures(bases, rowPictures) {
        const positions = Picture.rowPositions(rowPictures);
        return bases.map((base, i) => new Picture({ base, position: positions[i], id: Math.random() * Date.now(), editMode: true }));
    }
    static initPictureToEdit(pictures) {
        Main.setPictures(pictures);
    }

}