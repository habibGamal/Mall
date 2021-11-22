import store from "./store";


const dispatcher = {
    get: function (target, prop) {
        return (...payload) => {
            store.dispatch({
                to: target.to,
                type: prop,
                payload: payload
            });
        }
    }
}
export let Forms = new Proxy({ to: 'Forms' }, dispatcher);

export let Messages = new Proxy({ to: 'Messages' }, dispatcher);

export let ApiData = new Proxy({ to: 'ApiData' }, dispatcher);

export let Main = new Proxy({ to: 'Main' }, dispatcher);

export let Popup = new Proxy({ to: 'Popup' }, dispatcher);

export let Router = new Proxy({ to: 'Router' }, dispatcher);

export let customerEnv = new Proxy({ to: 'CustomerEnv' }, dispatcher);