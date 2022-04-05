import BackendCategory from "../../BackendTypes/BackendCategory";

type ApiDataStateType = {
    categories: Array<BackendCategory>
}
export const initialState: ApiDataStateType = {
    categories: [],
}
// helpers
function filtering(c: BackendCategory, id: number) {
    if (c.sub_categories.length !== 0) {
        c.sub_categories = c.sub_categories.filter(cc => filtering(cc, id));
    }
    return c.id !== id;
}
// state management
export class State {
    static to = 'ApiData';
    state: ApiDataStateType
    constructor(state: ApiDataStateType) {
        this.state = state;
    }
    getCategories(categories: Array<BackendCategory>) {
        return { ...this.state, categories };
    }
    deleteCategory(id: number) {
        const categories = this.state.categories.filter(c => filtering(c, id));
        return { ...this.state, categories };
    }
    clearCategories() {
        return { ...this.state, categories: [] };
    }
}

