import productApi from "../api/product";
import handlePath from "../helpers/picturePath";
import showFiles from "../helpers/showFiles";
import { Main } from "../redux/dispatcher";
import PicturePosition from "../types/PicturePosition";
import PictureTracking from "../types/PictureTracking";

type PictureType = {
    file?: File;
    path?: string;
    base?: string;
    position?: PicturePosition;
    id?: number;
    tracking?: PictureTracking;
    editMode?: boolean;
}
interface PictureFromJson {
    path: string,
    position: PicturePosition,
}
export default class Picture {
    file: File;
    path: string;
    base: string;
    id: number;
    position?: PicturePosition;
    tracking?: PictureTracking;
    editMode?: boolean;
    constructor({ file = null, path = null, base = null, position = null, id = null, editMode = null, tracking = null }: PictureType) {
        this.base = base;
        this.position = position;
        this.file = file
        this.id = id;
        this.path = path;
        this.editMode = editMode;
        this.tracking = tracking;
    }
    positionToJson() {
        return JSON.stringify(this.position);
    }
    // => multiconstructors
    // ==> get picture from Backend to display it 
    static getPicture(rawPictures: string): Picture {
        // => just get the first picture
        const [{ path, position }]: [PictureFromJson] = JSON.parse(rawPictures);
        return new Picture({ path: handlePath(path), position: position ?? { leftP: 50, topP: 0, heightP: 100 } });
    }
    // ==> get pictures from Backend to display them 
    static getPictures(rawPictures: string): Array<Picture> {
        const pictures: Array<PictureFromJson> = JSON.parse(rawPictures);
        return pictures.map(({ path, position }) => new Picture({ path: handlePath(path), position: position ?? { leftP: 50, topP: 0, heightP: 100 } }));
    }
    // ==> get pictures from Backend to edit their positions or delete them , we get the row path not the handled one
    static async getEditModePictures(rawPictures: string) {
        const pictures: Array<PictureFromJson> = JSON.parse(rawPictures);
        const rawPaths = pictures.map(({ path }) => path);
        const { data: bases }: { data: Array<string> } = await productApi.getRowPicture(rawPaths);
        const positions = pictures.map(({ position }) => position);
        return bases.map((base, i) => new Picture({ base, position: positions[i], path: rawPaths[i], id: Math.random() * Date.now(), editMode: true, tracking: { resized: false, deleted: false } }));
    }
    // => utilities
    // ==> when user upload the pictures we update the global store
    static init(e: React.ChangeEvent<HTMLInputElement>, id = null) {
        let files = e.target.files;
        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                showFiles(files[i]).then(e => {
                    // => files[i] is the whole file
                    // => base is the base64 of the file
                    const picture = new Picture({ file: files[i], base: (e.target.result as string), position: null, id: id ?? Math.random() * Date.now() })
                    Main.setPicture(picture);
                });
            }
        }
    }
    // ==> when admin edit the product , we initialize the global store with the product pictures
    static initPictureToEdit(pictures: Array<Picture>) {
        Main.setPictures(pictures);
    }

}