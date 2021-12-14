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
    setPicture(picture) {
        let pictures = [...this.state.pictures, picture];
        pictures.sort((a, b) => a.id - b.id);
        return { ...this.state, pictures};
    }
    setPictures(pictures) {
        let newPictures = [...this.state.pictures, ...pictures];
        newPictures.sort((a, b) => a.id - b.id);
        return { ...this.state, pictures:newPictures};
    }
    removePicture(id) {
        let pictures = this.state.pictures.filter(picture => picture.id !== id);
        return { ...this.state, pictures: pictures };
    }
    setPicturePosition(id, percentage) {
        let pictures = this.state.pictures;
        let i;
        pictures.forEach((picture, ii) => {
            // => id can be Math.random() or 1,2,3,...
            if (picture.id === id) {
                // => we get the index of the picture
                i = ii;
            }
        });
        // => assign picture's position to the percentages
        pictures[i].position = percentage;
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


