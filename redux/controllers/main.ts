import Picture from "../../models/Picture";
import ResizedPicture from "../../types/ResizedPicture";
// state type
type MainStateType = {
    authenticated?: boolean,
    pictures: Array<Picture>,
    // => holding the pictures' paths that the admin delete them during edit the product
    deletedPicturesPaths: Array<string>,
    // => holding the pictures' path,position that the admin resize them it during edit the product
    resizedOldPictures: Array<ResizedPicture>,
}
// initial state
export const initState: MainStateType = {
    authenticated: null,
    pictures: [],
    deletedPicturesPaths: [],
    resizedOldPictures: [],
}

// state management
export class State {
    static to = 'Main';
    public state: MainStateType;
    constructor(state: MainStateType) {
        this.state = state;
    }
    setPicture(picture: Picture) {
        const pictures: Array<Picture> = [...this.state.pictures, picture];
        pictures.sort((a, b) => a.id - b.id);
        return { ...this.state, pictures };
    }
    setPictures(pictures: Array<Picture>) {
        const newPictures = [...this.state.pictures, ...pictures];
        newPictures.sort((a, b) => a.id - b.id);
        return { ...this.state, pictures: newPictures };
    }
    removePicture(id: number) {
        let deletedPicturesPaths = this.state.deletedPicturesPaths;
        let resizedOldPictures = this.state.resizedOldPictures
        const pictures = this.state.pictures.filter(picture => {
            if (picture.id !== id) {
                return true;
            }
            if (picture.tracking?.deleted) {
                deletedPicturesPaths.push(picture.path);
                resizedOldPictures = resizedOldPictures.filter(({ path }) => picture.path !== path);
                return false;
            }
            return false;
        });
        return { ...this.state, pictures: pictures, deletedPicturesPaths, resizedOldPictures };
    }
    modifyPicture(id: number, picture: Picture) {
        let resizedOldPictures: Array<ResizedPicture> = this.state.resizedOldPictures;
        const pictures: Array<Picture> = this.state.pictures;
        let i: number;
        pictures.forEach((picture, ii) => {
            // => id can be Math.random() or 1,2,3,...
            if (picture.id === id) {
                // => we get the index of the picture
                i = ii;
            }
        });
        // => add the picture to resized old pictures
        if (picture.tracking?.resized) {
            // => change its position if it already exists
            let i: number;
            let resizedOldPicture: ResizedPicture;
            resizedOldPictures.forEach(({ path }, ii) => {
                if (path == picture.path) {
                    // => we get the index of the picture
                    resizedOldPicture = resizedOldPictures[ii];
                    i = ii;
                }
            });
            if (resizedOldPicture) {
                resizedOldPicture.position = picture.position;
                resizedOldPictures[i] = resizedOldPicture;
            } else {
                resizedOldPicture = { path: picture.path, position: picture.position }
                resizedOldPictures = [...resizedOldPictures,resizedOldPicture];
            }
        }
        // => assign picture's index to the new object of picture
        pictures[i] = picture;
        return { ...this.state, pictures: pictures, resizedOldPictures: [...resizedOldPictures] };
    }
    emptyPictures() {
        // => clear pictures array
        return { ...this.state, pictures: [] };
    }
    authenticating(auth) {
        return { ...this.state, authenticated: auth };
    }
}



