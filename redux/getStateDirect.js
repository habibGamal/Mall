import store from "./store";

export const Router = ()=>(store.getState().router);