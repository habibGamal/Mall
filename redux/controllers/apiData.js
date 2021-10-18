import category from "../../api/category";

// Reducer Name
const reducerName = 'ApiData';


const initialState = {
    categories:[],
}
// controller(it is control what function will be executed) => reducer
const reducer = (state = initialState, action) => {
    const manageState = new State(state);
    if (action.to === reducerName) {
        if (manageState[action.type]) {
            return manageState[action.type](...action.payload);
        }
    }
    return state;
    
}


// helpers
function filtering(c,id){
    if(c.sub_categories.length !== 0){
        c.sub_categories = c.sub_categories.filter(cc=>filtering(cc,id));
    }
    return c.id !== id;
}

// state management
class State {
    constructor(state) {
        this.state = state;
    }
    getCategories(categories){
        return {...this.state,categories};
    }
    deleteCategory(id){
        let categories = this.state.categories.filter(c=>filtering(c,id));
        return {...this.state,categories};
    }
    clearCategories(){
        return {...this.state,categories:[]};
    }
}

export default reducer;
