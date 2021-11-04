// Reducer Name
const reducerName = 'Main';

// initial state
const initState = {
    authenticated: null,
    pictures: [],
}
// controller(it is control what function will be executed) => reducer
const reducer = (state = initState, action) => {
    const manageState = new State(state);
    if (action.to === reducerName) {
        if (manageState[action.type]) {
            return manageState[action.type](...action.payload);
        }
    }
    return state;

}

// state management
class State {
    constructor(state) {
        this.state = state;
    }
    setPicture(picture, pictureId = null) {
        let pictures = [...this.state.pictures, { picture: picture.picture, base: picture.base, position: null, pictureId }];
        pictures.sort((a, b) => a.pictureId - b.pictureId);
        return { ...this.state, pictures};
    }
    removePicture(index) {
        let pictures = this.state.pictures.filter((_, i) => i !== index);
        return { ...this.state, pictures: pictures };
    }
    removePictureById(id) {
        let pictures = this.state.pictures.filter(picture => picture.pictureId !== id);
        return { ...this.state, pictures: pictures };
    }
    setPicturePositionById(id, percentage) {
        let pictures = this.state.pictures;
        let i;
        pictures.forEach((picture, ii) => {
            if (picture.pictureId === id) {
                i = ii;
            }
        });
        pictures[i].position = percentage;
        return { ...this.state, pictures: pictures };
    }
    setPicturePosition(index, percentage) {
        let pictures = this.state.pictures;
        pictures[index].position = percentage;
        return { ...this.state, pictures: pictures };
    }
    emptyPictures() {
        // => clear pictures array
        return { ...this.state, pictures: [] };
    }
    authenticating(auth) {
        return { ...this.state, authenticated: auth };
    }
}

export default reducer;


