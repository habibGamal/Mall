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
        return { ...this.state, pictures: [...this.state.pictures, { picture: picture, base: picture.base, position: null }] };
    }
    removePicture(index) {
        let pictures = this.state.pictures.filter((_, i) => i !== index);
        return { ...this.state, pictures: pictures };
    }
    setPicturePosition(index,percentage){
        let pictures = this.state.pictures;
        pictures[index].position = percentage;
        return {...this.state,pictures:pictures};
    }
    authenticating(bool){
        return {...this.state,authenticated:bool};
    }
}

export default reducer;


